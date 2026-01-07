import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverlessHttp from 'serverless-http';
import app from '../app';

const handler = serverlessHttp(app);

export default (req: VercelRequest, res: VercelResponse) => {
  return handler(req as any, res as any);
};
