// // src/auth/jwt.strategy.ts

// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from './auth.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'YOUR_SECRET_KEY', // Replace 'YOUR_SECRET_KEY' with your actual secret key
//     });
//   }

//   async validate(payload: any) {
//     return { userId: payload.sub, username: payload.username };
//   }
// }
