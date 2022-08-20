import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsService } from '../news/news.service';
import { Comment } from '../db/entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly newsService: NewsService,
  ) {
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const newsId = createCommentDto.newsId;
    const news = await this.newsService.getNewsById(+newsId);

    const comment = {
      author: 'yuriy',
      text: createCommentDto.text,
      date: new Date().toUTCString(),
      news,
    };

    return await this.commentRepository.save(comment);

  }

  async getComments(newsId: number) {
    return this.commentRepository.find({
      where: {
        news: {
          id: newsId,
        },
      },
    });
  }


  async updateComment(id, createCommentDto: CreateCommentDto) {
    const newsId = +createCommentDto.newsId;
    const news = await this.newsService.getNewsById(+newsId);
    const comment = await this.commentRepository.find({
      where: {
        id: id
      },
    });
    if (!news || !comment) {
      throw new NotFoundException();
    }

    const updatedComment = {
      ...comment,
      id:id,
      text: createCommentDto.text,
      date: new Date().toUTCString(),
      author:"yuriy"
    };
    await this.commentRepository.save(updatedComment);
    return await this.getComments(newsId);
  }


  async removeComment(commentId, newsId) {
    const news = await this.newsService.getNewsById(+newsId);
    const comment = await this.commentRepository.find({
      where: {
        id: commentId
      },
    });
    if (!news || !comment) {
      throw new NotFoundException();
    }
    await this.commentRepository.remove(comment);
    return await this.getComments(newsId);
  }

}