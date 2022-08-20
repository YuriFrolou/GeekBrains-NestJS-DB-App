import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile, Render,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileFilter, FileName } from '../utils/multer.config';


@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/thumbnails',
        filename: FileName,
      }),
      fileFilter: FileFilter,
    }),
  )
  async createNews(@UploadedFile() file: Express.Multer.File, @Body() createNewsDto: CreateNewsDto) {
    return await this.newsService.createNews({
      ...createNewsDto,
      thumbnail: `thumbnails/${file.filename}`,
    });
  }

  @Get()
  async getNews() {
    return await this.newsService.getNews();
  }

  @Get('/render')
  @Render('news-list')
 async getNewsRender() {
    return {
      titlePage: 'Список новостей',
      news: await this.newsService.getNews(),
    };
  }

  @Get(':id')
  getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById(+id);
  }

  @Get('render/:id')
  @Render('news-item')
  async getNewByIdRender(@Param('id') id: string) {
    return {
      titlePage: 'Страница новости',
      news: await this.newsService.getNewsById(+id),
    };
  }

  @Patch(':id')
  updateNews(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.updateNews(+id, updateNewsDto);
  }

  @Delete(':id')
  async removeNews(@Param('id') id: string) {
    return await this.newsService.removeNews(+id);
  }



}
