import * as faceapi from 'face-api.js';
import { Mood } from '../utils';

export type IFaceExpressionsDetection = faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection }>;
export type IFaceExpressions = faceapi.FaceExpressions;

export interface IMultiFaces {
  emotion: Mood;
  value: number;
}
