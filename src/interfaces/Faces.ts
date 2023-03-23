import * as faceapi from 'face-api.js';

export type IFaceExpressionsDetection = faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection }>;
export type IFaceExpressions = faceapi.FaceExpressions;
