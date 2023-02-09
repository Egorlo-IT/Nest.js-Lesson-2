import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('news-comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('all')
  // eslint-disable-next-line @typescript-eslint/ban-types
  getAll(@Query('idNews') idNews): Promise<{}> {
    return this.commentsService.findAll(idNews);
  }
  @Post('create')
  async create(@Query('idNews') idNews, @Body() comment): Promise<number> {
    return this.commentsService.create(idNews, null, comment);
  }
  @Post(':id/reply')
  async reply(
    @Param('id') idComment: string,
    @Body() comment: string,
  ): Promise<number> {
    return this.commentsService.create(null, idComment, comment);
  }
  @Post('edit')
  async edit(@Query('idComment') idComment, @Body() comment): Promise<boolean> {
    return this.commentsService.edit(idComment, comment);
  }
  @Delete('all')
  removeAll(@Query('idNews') idNews): Promise<boolean> {
    return this.commentsService.removeAll(idNews);
  }
  @Delete(':id')
  remove(@Query('idNews') idNews, @Param('id') idComment): Promise<boolean> {
    return this.commentsService.remove(idNews, idComment);
  }
}
