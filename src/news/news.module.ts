import { Global, Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '../db/entities/news.entity';
import { Comment } from '../db/entities/comment.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([News, Comment])
  ],
  exports:[NewsService],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
