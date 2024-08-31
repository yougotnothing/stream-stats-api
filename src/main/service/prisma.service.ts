import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async onModuleInit() {
    this.$extends(
      withPulse({
        apiKey: this.configService.get<string>('PULSE_API_KEY'),
      })
    );
    await this.$connect();
  }
}
