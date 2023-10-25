import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function testMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Test Middleware`, req.method);
  next();
}
