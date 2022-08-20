import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { News } from '../db/entities/news.entity';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  async sendTest() {
    console.log('Отправляется тестовое письмо');
    try {
      return await this.mailerService.sendMail({
        to: 'yf_dev_test@mail.ru',
        subject: 'Тестовое письмо',
        template: `${join(process.cwd(),'dist/mail/templates/test')}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendNewNewsForAdmins(emails: string[], news: News): Promise<void> {
    console.log('Отправляются письма о новой новости администрации ресурса');
    for (const email of emails) {
      try {
        const sentMessageInfo = await this.mailerService.sendMail({
          to: email,
          subject: `Создана новая новость: ${news.title}`,
          template: './new-news',
          context: news,
        });
        console.log(sentMessageInfo);
      } catch (error) {
        console.log(error);
      }
    }
  }

 async updateNewsLogMessage(addressTo: string, array:News[]) {
    return await this.mailerService
      .sendMail({
        to: addressTo,
        subject: 'Обновление данных!',
        template: `${join(process.cwd(),'dist/mail/templates/update')}`,
        context: {
          news:array[0],
          updatedNews:array[1]
        }
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

}
