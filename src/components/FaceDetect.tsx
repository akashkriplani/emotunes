import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react';
import P5 from 'p5';
import { IFaceExpressions, IFaceExpressionsDetection } from '../interfaces/Faces';
import Sketch from 'react-p5';

// Get face API model URL
const MODEL_URL = '/models';

const FaceDetect = () => {
  const [mood, setMood] = useState('');

  // Save current camera image
  let captureImage: P5.Element;

  // to save the result of face-api face captures
  let drawFaces: IFaceExpressionsDetection[] = [];

  // to save the emotion on click of the canvas
  let emotion: string = '';

  // to stop drawing the canvas on mouse click and save its status
  let stopDraw: boolean = false;

  // used to store the result for the face-api.js model
  const showFaceDetectionData = (data: IFaceExpressionsDetection[]) => {
    drawFaces = data;
    return drawFaces;
  };

  const setup = async (P5: any, canvasParentRef: Element) => {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadAgeGenderModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);

    P5.createCanvas(640, 480).parent(canvasParentRef);

    // Add camera capture ability to canvas
    const constraints = {
      video: {
        mandatory: {
          minWidth: 640,
          minHeight: 480
        },
        optional: [{ maxFrameRate: 40 }]
      },
      audio: false
    };

    if (!stopDraw) {
      captureImage = P5.createCapture(constraints, () => {});
      captureImage.id('video_element');
      captureImage.size(640, 480);
      captureImage.hide();
    }
  };

  const draw = async (P5: any) => {
    if (!captureImage || !document.getElementById('video_element')) {
      return;
    }

    P5.background(255);
    P5.image(captureImage, 0, 0);
    P5.fill(0, 0, 0, 0);

    drawFaces.map((drawing) => {
      if (drawing) {
        P5.textSize(15);
        P5.strokeWeight(1);

        const textX = drawing.detection.box.x + drawing.detection.box.width;
        const textY = drawing.detection.box.y + drawing.detection.box.height;

        const copiedExpression = drawing.expressions;

        const expressions = Object.keys(copiedExpression).map((key) => {
          const value = copiedExpression[key];
          return value;
        });

        const max = Math.max(...expressions);

        const expression_value = Object.keys(copiedExpression).filter((key) => {
          return copiedExpression[key] === max;
        })[0];

        const moodText = 'Mood: ' + expression_value;
        const moodTextWidth = P5.textWidth(moodText);
        P5.text(moodText, textX - moodTextWidth - 10, textY - 10);

        P5.strokeWeight(4);
        P5.stroke('#fff');
        P5.rect(
          drawing.detection.box.x,
          drawing.detection.box.y,
          drawing.detection.box.width,
          drawing.detection.box.height
        );
      }
      return drawing;
    });

    faceapi
      .detectAllFaces(captureImage.id())
      .withFaceExpressions()
      .then((data) => showFaceDetectionData(data))
      .catch((error) => console.log(error.message));
  };

  const mouseClicked = (P5: any) => {
    if (!emotion) {
      // Stop the draw
      if (P5.isLooping()) {
        P5.noLoop();
        captureImage.remove();
        stopDraw = true;
      }

      const result = drawFaces.map((drawing: IFaceExpressionsDetection) => {
        if (drawing) {
          const getExpressions: IFaceExpressions = drawing.expressions;
          console.log(getExpressions);

          const expressions = Object.keys(getExpressions).map((key) => {
            const value = getExpressions[key] as number;
            return value;
          });

          const max = Math.max(...expressions);

          const expression_value = Object.keys(getExpressions).filter((key) => {
            return getExpressions[key] === max;
          })[0];

          emotion = expression_value;
        }
        return {
          mood: emotion
        };
      });
      if (result && result.length > 0) {
        console.log(result);
        setMood(result[0].mood);
      }
    }
  };

  useEffect(() => {
    if (mood) {
      console.log(mood);
    }
  }, [mood]);

  return (
    <div className="flex items-center flex-col justify-items-start px-4 py-4">
      <h2 className="text-2xl p-4">Click anywhere on the video to capture your mood</h2>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
    </div>
  );
};

export default FaceDetect;
