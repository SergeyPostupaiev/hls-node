import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { router } from './router';
import { createDirForVideos } from './helpers';
dotenv.config();

const DIR_NAME = 'videos';
const PORT = process.env.PORT;
createDirForVideos(DIR_NAME);

const start = () => {
  const app: Application = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api', router);

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
