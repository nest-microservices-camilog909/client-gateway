import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { services } from 'src/config';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(services.NATS_SERVICE)
		private readonly client: ClientProxy,
	) {}

	@Post('register')
	registerUser(@Body() request: RegisterUserDto) {
		return this.client.send('auth.register', request).pipe(
			catchError((err) => {
				throw new RpcException(err);
			}),
		);
	}

	@Post('login')
	loginUser(@Body() request: LoginUserDto) {
		return this.client.send('auth.login', request).pipe(
			catchError((err) => {
				throw new RpcException(err);
			}),
		);
	}

	@UseGuards(AuthGuard)
	@Get('verify')
	verifyUser(
		@User() user: { id: string; name: string; email: string },
		@Token() token: string,
	) {
		return { user, token };
	}
}
