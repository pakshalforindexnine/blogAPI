// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// app.module.ts

import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import {User} from './users/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost', // Update with your MySQL host
        port: 5432, // Update with your MySQL port
        username: 'postgres', // Update with your MySQL username
        password: '', // Update with your MySQL password
        database: 'blop_api', // Update with your MySQL database name
        entities: [User],
        synchronize:true
    })
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule, UsersModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get<string>('DB_HOST', 'localhost'), // Update with your MySQL host
    //     port: configService.get<number>('DB_PORT', 3306), // Update with your MySQL port
    //     username: configService.get<string>('DB_USER', 'root'), // Update with your MySQL username
    //     password: configService.get<string>('DB_PASSWORD', ''), // Update with your MySQL password
    //     database: configService.get<string>('DB_NAME', 'blop_API'), // Update with your MySQL database name
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true, // Auto-sync database schema (for development only)
    //   }),
    // }),
  ],
  
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
