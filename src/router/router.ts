import { Router } from 'express';
import { videoRouter, videoStreamRouter } from './routes';

export const router = Router();
export const streamRouter = Router();

router.use(videoRouter);
streamRouter.use(videoStreamRouter);
