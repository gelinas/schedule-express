import compression from 'compression';
import cors from 'cors';
import express, { urlencoded } from 'express';
import helmet from 'helmet';
import path from 'path';

declare global {
  // eslint-disable-next-line no-var
  var storageDir: string;
}
global.storageDir = path.resolve(__dirname).replace(/(\/src)|(\/build)|(\\src)|(\\build)/gi, '/storage');

export const init = () => {
  const app = express();

  // compress responses unless explicitly requested
  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
    }),
  );

  // allow JSON body in req
  app.use(urlencoded({ extended: false }));

  // allow app to use CORS
  app.use(cors());

  // header security
  app.use(helmet());

  return app;
};
