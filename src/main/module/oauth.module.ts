import { Module } from '@nestjs/common';
import { OAuthController } from 'controller/oauth';
import { OAuthService } from 'service/oauth';

@Module({
  providers: [OAuthService],
  controllers: [OAuthController],
  exports: [OAuthService],
})
export class OAuthModule {}
