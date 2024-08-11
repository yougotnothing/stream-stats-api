import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class OAuthService {
  constructor() {}

  async authorize(res: Response): Promise<any> {
    console.log(res);
    return 'hello world';
  }
}
