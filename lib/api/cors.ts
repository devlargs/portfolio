import CORS from 'cors';
import initMiddleware from '@lib/api/initMiddleware';

export default initMiddleware(
  CORS({
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
  })
);
