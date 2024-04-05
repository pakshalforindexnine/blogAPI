// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {AuthController} from './auth.controller';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';

const crypto = require('crypto');

 // Import UsersModule here

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule, // Import and include UsersModule here
  ],
  providers: [AuthService],
  controllers:[AuthController],
  exports: [AuthService],
})
export class AuthModule {}
