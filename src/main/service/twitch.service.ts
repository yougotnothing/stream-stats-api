import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { ValidateTokenDto } from 'dto/validate-token';
import { TwitchUserDto } from 'dto/twitch-user';
import { Response } from 'express';
import { UUID } from 'crypto';

@Injectable()
export class TwitchService {
  private readonly clientId =
    this.configService.get<string>('TWITCH_CLIENT_ID');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async getUser(
    id: string,
    token: string,
    res: Response
  ): Promise<TwitchUserDto> {
    if (!res['user']) throw new HttpException('User not found', 401);

    const user_data = (await fetch(
      `https://id.twitch.tv/helix/users?id=${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Client-Id': this.clientId,
        },
      }
    ).then(res => {
      if (res.status === 401) throw new HttpException('Token is invalid', 401);
      return res.json();
    })) as TwitchUserDto;

    const twitchUser = await this.prismaService.twitchUser.create({
      data: {
        id: user_data.id,
        login: user_data.login,
        display_name: user_data.display_name,
        type: user_data.type,
        broadcaster_type: user_data.broadcaster_type,
        description: user_data.description,
        profile_image_url: user_data.profile_image_url,
        offline_image_url: user_data.offline_image_url,
        view_count: user_data.view_count,
        email: user_data.email,
        created_at: user_data.created_at,
        userId: res['user'].id as UUID,
      },
    });

    return twitchUser;
  }

  async validateToken(token: string): Promise<ValidateTokenDto> {
    return await fetch('https://id.twitch.tv/oauth2/validate', {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${token}`,
      },
    }).then(res => {
      if (res.status === 401) throw new HttpException('Token is invalid', 401);
      return res.json();
    });
  }
}
