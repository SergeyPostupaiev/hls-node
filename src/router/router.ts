import { Router } from 'express';
import { videoRouter } from './routes';

export const router = Router();

router.use(videoRouter);
