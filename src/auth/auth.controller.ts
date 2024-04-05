// auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto, registerDto.username, registerDto.password);
    }

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.signin(LoginDto.username, LoginDto.password)
  }
}
