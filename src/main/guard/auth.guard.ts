import { Injectable, CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractToken(request);

		if(!token) throw new HttpException('Token not found', 401);

		try {
			const payload = this.jwtService.verify(token);

			return true;
		}catch(error: any) {
			console.log(error);
			throw new HttpException('Token is invalid', 401);
		}
	}

	private extractToken(req: Request): string | undefined {
		const [type, token] = req.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}