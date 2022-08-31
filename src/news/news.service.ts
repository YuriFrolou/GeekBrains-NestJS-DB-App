import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from '../db/entities/news.entity';
import { MailService } from '../mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class NewsService {

  constructor(@InjectRepository(News) private readonly newsRepository: Repository<News>,
              private readonly mailService: MailService) {
  }

  async createNews(createNewsDto: CreateNewsDto) {
    const news = {
      author: 'yuriy',
      title: createNewsDto.title,
      text: createNewsDto.text,
      date: new Date().toUTCString(),
      thumbnail: createNewsDto.thumbnail,
    };

    return await this.newsRepository.save(news);
  }

  async getNews() {
    return await this.newsRepository.find({
      relations: ['comments'],
      join: {
        alias: 'news',
        leftJoinAndSelect: {
          comments: 'news.comments',
        },
      },
    });
  }

  async getNewsById(id: number) {
    const news = await this.newsRepository.findOne({
      where: {
        id,
      },
      relations: ['comments'],
      join: {
        alias: 'news',
        leftJoinAndSelect: {
          comments: 'news.comments',
        },
      },
    });

    if (!news) {
      throw new NotFoundException();
    }

    return news;
  }


  async updateNews(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.newsRepository.findOneBy({ id });

    if (!news) {
      throw new NotFoundException();
    }
    const updatedNews = {
      ...news,
      title: updateNewsDto.title ? updateNewsDto.title : news.title,
      text: updateNewsDto.text ? updateNewsDto.text : news.text,
      date: new Date().toUTCString(),
    };
    await this.newsRepository.save(updatedNews);
    await this.mailService.updateNewsLogMessage('yf_dev_test@mail.ru', [news, updatedNews]);
    return updatedNews;
  }


  async removeNews(id: number) {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException();
    }
    await this.newsRepository.remove(news);
    return await this.newsRepository.find();
  }


}
