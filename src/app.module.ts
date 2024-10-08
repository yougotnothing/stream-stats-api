import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'module/auth';
import { PrismaService } from 'service/prisma';
import { TwitchModule } from 'module/twitch';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthModule, TwitchModule],
})
export class AppModule {}
