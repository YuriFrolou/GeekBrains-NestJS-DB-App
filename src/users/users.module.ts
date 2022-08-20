import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '../db/entities/news.entity';
import { Comment } from '../db/entities/comment.entity';
import { User } from '../db/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([News, Comment,User])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
