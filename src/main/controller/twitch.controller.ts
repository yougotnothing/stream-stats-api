import { Controller, Get, HttpCode, Query, Res } from '@nestjs/common';
import { TwitchUserDto } from 'dto/twitch-user';
import { ValidateTokenDto } from 'dto/validate-token';
import { Response } from 'express';
import { TwitchService } from 'service/twitch';

@Controller('twitch')
export class TwitchController {
  constructor(private readonly twitchService: TwitchService) {}

  @Get('validate')
  @HttpCode(200)
  async validateToken(
    @Query('token') token: string
  ): Promise<ValidateTokenDto> {
    return await this.twitchService.validateToken(token);
  }

  @Get('user')
  @HttpCode(200)
  async getUser(
    @Query('id') id: string,
    @Query('token') token: string,
    @Res() res: Response
  ): Promise<TwitchUserDto> {
    return await this.twitchService.getUser(id, token, res);
  }
}
