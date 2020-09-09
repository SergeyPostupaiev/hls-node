import { Router } from 'express';
import { VideoController } from '../../controllers';

export const videoStreamRouter: Router = Router();

videoStreamRouter.get('/videos', VideoController.getVideos);
