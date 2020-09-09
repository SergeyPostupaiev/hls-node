import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { VideoService, emitter } from '../services';

type idList = { id: number; playListLink: string };

export class VideoController {
  public static transformVideoLink(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hostName = `${req.protocol}://${req.get('host')}`;

    VideoService.convertToHSL(req.body.link);

    emitter.once('startCnv', ({ id, playListLink }: idList) => {
      res.send({
        id,
        playListLink: `${hostName}/${playListLink}`,
      });
    });
  }

  public static deleteGenerated(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    VideoService.deleteChunks(req.body.id);

    emitter.once('endDeletion', (data: { key: string }) => {
      res.send(data);
    });
  }

  public static getAllId(req: Request, res: Response) {
    VideoService.getIdList();

    emitter.once('getIds', (data: { key: string }) => {
      res.send(data);
    });
  }

  public static getVideos(req: Request, res: Response) {
    return res.status(200).sendFile(`${process.cwd()}/static/index.html`);
  }
}
