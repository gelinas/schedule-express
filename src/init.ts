import compression from 'compression';
import cors from 'cors';
import express, { urlencoded, json } from 'express';
import helmet from 'helmet';
import path from 'path';

declare global {
  // eslint-disable-next-line no-var
  var storageDir: string;
}
global.storageDir = path.resolve(__dirname).replace(/(\/src)|(\/build)|(\\src)|(\\build)/gi, '/storage');

export const init = () => {
  const app = express();

  // allow JSON body in req
  app.use(urlencoded({ extended: false }));

  app.use(json());

  // allow app to use CORS
  app.use(cors());

  // header security
  // app.use(helmet());

  return app;
};
