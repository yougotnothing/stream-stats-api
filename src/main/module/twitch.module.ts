import { Module } from '@nestjs/common';
import { TwitchController } from 'controller/twitch';
import { TwitchService } from 'service/twitch';

@Module({
  imports: [],
  controllers: [TwitchController],
  providers: [TwitchService],
})
export class TwitchModule {}
