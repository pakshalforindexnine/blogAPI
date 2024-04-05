// app.module.ts
import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import {User} from './users/user.entity';
import { AuthModule } from './auth/auth.module';
// import { AdminGuard } from './admin/admin.guard';
import { BlogModule } from './blogs/blogs.module';
import { Blog } from './blogs/blog.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost', // Update with your MySQL host
        port: 5432, // Update with your MySQL port
        username: 'postgres', // Update with your MySQL username
        password: '', // Update with your MySQL password
        database: 'blop_api', // Update with your MySQL database name
        entities:{ User,Blog, Comment },
        synchronize:true
    }),
    UsersModule,
    AuthModule,
    BlogModule,
    CommentsModule
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
    // {
    //       provide: APP_GUARD,
    //       useClass: AdminGuard,
    // }
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
