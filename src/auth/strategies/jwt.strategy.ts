import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_KEY,
		});
	}

	async validate(payload: JwtPayload) {
		// Extract user information from the payload, assuming it has a `sub` or similar identifier
		const user = await this.authService.validateUserById(payload.sub);
		console.log({user, payload});
		
		if (!user) {
			throw new UnauthorizedException('Unauthorized');
		}
		return user; // The user will be attached to the request object
	}
}
