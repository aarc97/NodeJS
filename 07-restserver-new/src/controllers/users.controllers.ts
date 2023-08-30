import { Request, Response } from 'express';

type PostBodyRequest = {
  name: string;
  age: number;
};

export const usersGet = (req: Request, res: Response) => {
  const {
    name = '',
    lastName = '',
    apiKey = '',
    page = 1,
    limit = 0,
  } = req.query;

  res.status(200).json({
    msg: 'get beautiful API',
    name,
    lastName,
    apiKey,
    page,
    limit,
  });
};

export const usersPost = (req: Request, res: Response) => {
  const body: PostBodyRequest = req.body;

  res.status(200).json({
    msg: 'get beautiful API',
    body,
  });
};

export const usersPut = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'put API',
    id,
  });
};

export const usersDelete = (req: Request, res: Response) => {
  res.json({
    msg: 'Delete API',
  });
};

export const usersPatch = (req: Request, res: Response) => {
  res.json({
    msg: 'patch API',
  });
};
