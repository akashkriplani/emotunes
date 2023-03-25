import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react';
import P5 from 'p5';
import { IFaceExpressions, IFaceExpressionsDetection, IMultiFaces } from '../interfaces/Faces';
import Sketch from 'react-p5';
import { Mood } from '../utils';

// Get face API model URL
const MODEL_URL = '/models';

const FaceDetect = ({ onCanvasClick }) => {
  const [mood, setMood] = useState('');
  const [noFace, setNoFace] = useState(false);

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
    const { mouseX, mouseY, width, height } = P5;
    // Check if the mouse click happens inside the canvas
    if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
      if (!emotion) {
        // Stop the draw
        if (P5.isLooping()) {
          P5.noLoop();
          captureImage.remove();
          stopDraw = true;
        }

        const multiFaceExpressions: IMultiFaces[] = [];

        const result = drawFaces.map((drawing: IFaceExpressionsDetection) => {
          if (drawing) {
            const getExpressions: IFaceExpressions = drawing.expressions;

            const expressions = Object.keys(getExpressions).map((key) => {
              const value = getExpressions[key] as number;
              return value;
            });

            const max = Math.max(...expressions);

            const expression_value = Object.keys(getExpressions).filter((key) => {
              return getExpressions[key] === max;
            })[0];

            multiFaceExpressions.push({ emotion: expression_value as Mood, value: max });

            emotion = getBestEmotion(multiFaceExpressions);
          }
          return {
            mood: emotion
          };
        });
        if (result && result.length > 0) {
          setMood(result[0].mood);
          onCanvasClick(result[0].mood);
        } else {
          setNoFace(true);
        }
      }
    }
  };

  // If there are multiple faces detected, it takes out the best emotion in them and compares it.
  // The higher the value of the emotion of a face, that emotion will be passed to the music search query.
  const getBestEmotion = (faces: IMultiFaces[]) => {
    return (faces || []).map((face) => {
      let max = 0,
        emotion = '';
      if (max < face.value) {
        max = face.value;
        emotion = face.emotion;
      }
      return emotion;
    })[0];
  };

  const handleRedraw = () => {
    // TODO: Need to add a better functionality rather than re-loading the whole page
    window.location.reload();
  };

  useEffect(() => {
    if (mood) {
      console.log(mood);
    } else if (noFace && !mood) {
      // TODO: Handle error scenario while mood is not detected
      window.alert('Mood not detected');
    }
  }, [mood, noFace]);

  return (
    <div className="flex items-center flex-col justify-items-start px-8 py-8">
      <h2 className="text-2xl px-4 py-4">Click anywhere on the video to capture your mood</h2>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      {(mood || noFace) && (
        <button
          onClick={() => handleRedraw()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Retake
        </button>
      )}
    </div>
  );
};

export default FaceDetect;
