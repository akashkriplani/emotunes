import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react';
import p5 from 'p5';
// mport youtube from '../apis/Youtube';
import { IFaceExpressions, IFaceExpressionsDetection } from '../interfaces/Faces';

// Get face API model URL
const MODEL_URL = '/models';

const FaceDetection = () => {
  const [mood, setMood] = useState('');

  // Save current camera image
  let captureImage: p5.Element;

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

  const p = (p5: p5) => {
    // Overriding the setup method from p5.js library
    p5.setup = async () => {
      await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
      await faceapi.loadAgeGenderModel(MODEL_URL);
      await faceapi.loadFaceExpressionModel(MODEL_URL);

      p5.createCanvas(640, 480);

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
        captureImage = p5.createCapture(constraints, () => {});
        captureImage.id('video_element');
        captureImage.size(640, 480);
        captureImage.hide();
      }
    };

    // Overriding the draw method from p5.js library
    p5.draw = async () => {
      if (!captureImage || !document.getElementById('video_element')) {
        return;
      }

      p5.background(255);
      p5.image(captureImage, 0, 0);
      p5.fill(0, 0, 0, 0);

      drawFaces.map((drawing) => {
        if (drawing) {
          p5.textSize(15);
          p5.strokeWeight(1);

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
          const moodTextWidth = p5.textWidth(moodText);
          p5.text(moodText, textX - moodTextWidth - 10, textY - 10);

          p5.strokeWeight(4);
          p5.stroke('rgb(100%,100%,100%)');
          p5.rect(
            drawing.detection.box.x,
            drawing.detection.box.y,
            drawing.detection.box.width,
            drawing.detection.box.height
          );
        }
        return drawing;
      });

      if (captureImage.id() && document.getElementById('video_element')) {
        faceapi
          .detectAllFaces(captureImage.id())
          .withFaceExpressions()
          .then((data) => {
            return showFaceDetectionData(data);
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
    };

    p5.mouseClicked = () => {
      if (!emotion) {
        // Stop the draw
        if (p5.isLooping()) {
          p5.noLoop();
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
          setMood(result[0].mood);
        }
      }
    };
  };

  // const callYoutubeApi = async (term: string) => {
  //   const response = await youtube.get('/search', {
  //     params: {
  //       q: term
  //     }
  //   });
  // };

  let p5Instance: p5;

  useEffect(() => {
    if (!mood) {
      p5Instance = new p5(p);
    } else {
      // TODO: Uncomment below to get the list of tracks based on moods
      console.log(mood);
    }
  }, [mood]);

  const handleButtonClick = () => {
    p5Instance.mouseClicked();
  };

  return (
    <div className="flex items-center justify-items-start px-4 py-4">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Capture Mood
      </button>
    </div>
  );
};

export default FaceDetection;
