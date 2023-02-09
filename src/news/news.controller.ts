import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { News } from './news.interface';
import { NewsService } from './news.service';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/newsTemplate';
import { newsTemplateDetail } from '../views/newsTemplateDetail';
import { CommentsService } from './comments/comments.service';

@Controller('news')
export class NewsController {
  constructor(
    private newsService: NewsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get('all')
  async getNews(@Res() response): Promise<News[]> {
    return response.status(200).send(this.newsService.findAll());
  }

  @Get(':id')
  async getById(@Param('id') id): Promise<News | undefined> {
    return this.newsService.findByIndex(id);
  }

  @Post('create')
  async create(@Body() news: News, @Res() response: Response) {
    if (this.newsService.create(news) !== 0) {
      return response.status(200).send('Новость успешно создана');
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error:
            'При создании новости произошла непредвиденная ошибка. Попробуйте повторить операцию позже',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('edit')
  async edit(@Body() news: News, @Res() response: Response) {
    if (this.newsService.edit(news) !== 0) {
      return response
        .status(200)
        .send(
          `Новость с идентификатором id: ${news.id} успешно отредактирована`,
        );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Новость с идентификатором id: ${news.id} не найдена!`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') idNews): Promise<boolean> {
    return (
      this.newsService.remove(idNews) && this.commentService.removeAll(idNews)
    );
  }

  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }

  @Get(':id/detail')
  async getByIdDetail(@Param('id') id): Promise<string> | null {
    const newsDetail = this.newsService.findByIndex(id);
    const comments = await this.commentService.findAll(id);
    return htmlTemplate(newsTemplateDetail(newsDetail, comments));
  }
}
