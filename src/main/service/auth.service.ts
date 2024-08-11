import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: User): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  }
}
