import { check } from 'express-validator';

export class VideoValidation {
  public static getCheckVideo() {
    return [check('link', 'Link is required').not().isEmpty()];
  }

  public static getDeleteVideo() {
    return [check('id', 'Id is required').not().isEmpty()];
  }
}
