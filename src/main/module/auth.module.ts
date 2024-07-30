import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				global: true,
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get<number>('JWT_EXPIRES_IN'),
				}
			}),
			inject: [ConfigService]
		})
	],
})
export class AuthModule {}