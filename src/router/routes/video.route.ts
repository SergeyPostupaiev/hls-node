import { Router } from 'express';
import { VideoController } from '../../controllers';
import { VideoValidation } from '../../validations';

export const videoRouter: Router = Router();

videoRouter.get('/link', VideoController.getAllId);

// @params - link:string
videoRouter.post(
  '/link',
  VideoValidation.getCheckVideo(),
  VideoController.transformVideoLink
);

// @params - id:number
videoRouter.delete(
  '/link',
  VideoValidation.getDeleteVideo(),
  VideoController.deleteGenerated
);
