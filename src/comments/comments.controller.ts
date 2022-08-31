import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.createComment(createCommentDto);
  }

  @Get(':newsId')
  async getComments(@Param('newsId') newsId: string) {
    return await this.commentsService.getComments(+newsId);
  }

  @Get('render/:newsId')
  @Render('comments-list')
  async findCommentsByNews(@Param('newsId') newsId: string) {
    return {
      titlePage:"Список комментариев новости",
      comments: await this.commentsService.getComments(+newsId)
    };
  }

  @Patch(':id')
  async updateComment( @Param('id') id, @Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.updateComment(+id, createCommentDto);
  }

@Delete(':commentId/:newsId')
  async removeComment(@Param('commentId') commentId, @Param('newsId') newsId) {
    return await this.commentsService.removeComment(+commentId, +newsId);
  }

}
