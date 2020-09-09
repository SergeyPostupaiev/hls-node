import { Router } from 'express';
import { VideoController } from '../../controllers';
import { VideoValidation } from '../../validations';

export const videoRouter: Router = Router();

videoRouter.get('/link', VideoController.getAllId);

videoRouter.post(
  '/link',
  VideoValidation.getCheckVideo(),
  VideoController.transformVideoLink
);

videoRouter.delete(
  '/link',
  VideoValidation.getDeleteVideo(),
  VideoController.deleteGenerated
);

videoRouter.get('/videos', VideoController.getVideos);
