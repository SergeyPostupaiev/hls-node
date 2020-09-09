import fs from 'fs';

export const createDirForVideos = (dirName: string) => {
  fs.mkdir(dirName, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
