import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line
const initMiddleware = (middleware: any) => {
  return (req: NextApiRequest, res: NextApiResponse): Promise<unknown> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

export default initMiddleware;
