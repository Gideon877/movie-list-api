import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';
import { UserSignUpDto } from './dto/signup.dto';

@Controller('auth') 
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) { }


	@Post('login')
	async login(@Body() userData: UserLoginDto) {
		const { username, password } = userData;

		const user = await this.authService.validateUser(username, password);
		if (!user) {
			throw new Error('Invalid credentials');
		}

		return this.authService.login(user);
	}

	@Post('signup')
	async signup(@Body() signupData: UserSignUpDto) {
		return this.authService.signup(signupData)
    }

	// TODO: add @UseGuards(JwtAuthGuard) on production
	@Get('users')
    async users() {
        return this.authService.users();
    }
}
