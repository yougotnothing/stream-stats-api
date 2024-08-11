import { Controller, Get, Query, Res } from '@nestjs/common';
import { OAuthService } from 'service/oauth';
import { Response } from 'express';

@Controller('OAuth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('authorize')
  async authorize(
    @Query('service') service: 'youtube' | 'twitch' | 'trovo' | 'kick',
    @Res() res: Response
  ) {
    return this.oauthService.authorize(res);
  }
}
