import { Request, Response } from 'express';

const errorhandler = (req: Request, res: Response) => {
  console.log('first', req);
  res.status(200).json({
    meta: {
      status_code: 10,
      status_message: 'Error',
    },
    data: [],
  });
};

export { errorhandler };
