import path from 'path';
import fs from 'fs';
import { createDirForVideos } from '../helpers';

const Emitter = require('events');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const emitter = new Emitter();

export class VideoService {
  public static HSLConvertParams: string[] = [
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls',
  ];

  public static convertToHSL(link: string) {
    const id = Date.now();
    const DIR_NAME = `videos/${id}`;

    const playListLink = path.join(process.cwd(), `${DIR_NAME}/output.m3u8`);
    createDirForVideos(DIR_NAME);
    const converter = new ffmpeg();

    converter
      .addInput(link)
      .outputOptions(VideoService.HSLConvertParams)
      .output(playListLink)
      .on('start', (commandLine) => {
        console.log(`Command: ${commandLine}`);
      })
      .on('error', (err) => {
        console.log(err.message);
      })
      .on('progress', (progress) => {
        console.log(`Processing: ${Math.floor(progress.percent)}%`);
      })
      .on('end', () => {
        console.log('Done');
        const data = {
          id,
          playListLink,
        };

        emitter.emit('endCnv', data);
      })
      .run();
  }

  public static deleteChunks(id: number) {
    const dir = path.join(process.cwd(), `videos/${id}`);
    fs.rmdir(dir, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }

      emitter.emit('endDeletion', {
        result: 'success',
      });
    });
  }

  public static getIdList() {
    fs.readdir(path.join(process.cwd(), '/videos'), (err, items) => {
      if (err) {
        console.log(err);
      }
      const idArr = items.map((item) => item);

      emitter.emit('getIds', {
        result: idArr,
      });
    });
  }
}
