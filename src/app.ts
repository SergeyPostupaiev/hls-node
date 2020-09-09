import fs from 'fs';
import path from 'path';
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import hls from 'hls-server';
import { router, streamRouter } from './router';
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
  app.use('/', streamRouter);

  const server = app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
  );
  launchHlsStreaming(server);
};

const launchHlsStreaming = (server) => {
  new hls(server, {
    provider: {
      exists: (req, cb) => {
        const ext = path.extname(req.url);

        if (ext !== '.m3u8' && ext !== '.ts') {
          return cb(null, true);
        }

        fs.access(process.cwd() + req.url, fs.constants.F_OK, (err) => {
          if (err) {
            console.log('File not exist');
            return cb(null, false);
          }
          cb(null, true);
        });
      },
      getManifestStream: (req, cb) => {
        const stream = fs.createReadStream(process.cwd() + req.url);
        cb(null, stream);
      },
      getSegmentStream: (req, cb) => {
        const stream = fs.createReadStream(process.cwd() + req.url);
        cb(null, stream);
      },
    },
  });
};

start();
