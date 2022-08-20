import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles/roles.guard';
import { MailModule } from './mail/mail.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { News } from './db/entities/news.entity';
import { User } from './db/entities/user.entity';
import { Comment} from './db/entities/comment.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'NnVvGET',
      database: 'gb_news',
      port: 5432,
      logging: true,
      migrationsRun: false,
      synchronize: true,
      entities: [News,Comment, User],
    }),
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
    NewsModule,
    MailModule,
    CommentsModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
}
