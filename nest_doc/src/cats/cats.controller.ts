import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  BadRequestException,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { CreateCatDto } from './dto';
import { CatsService } from './cats.service';
import { ForbiddenException } from 'src/exception/error400.exception';
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto) {
    throw new HttpException('예외 필터입니다.', 400);
  }
  // @Post()
  // create(@Body() createCatDto: CreateCatDto) {
  //   return 'This action adds a new cat';
  // }

  @Get()
  findAll(@Query() query) {
    // throw new HttpException('에러입니다', HttpStatus.FORBIDDEN);
    // try {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.NOT_FOUND,
    //       error: 'This is a custom message',
    //     },
    //     HttpStatus.FORBIDDEN,
    //     {
    //       cause: '그냥 에러가 났습니다.',
    //     },
    //   );
    //   return `This action returns all cats (limit: ${query.limit} items)`;
    // } catch (err) {
    //   console.log(err);
    // }
    // throw new ForbiddenException();
    // throw new BadRequestException('뭔가 잘못됐는데?', {
    //   cause: new Error(),
    //   description: '그러게',
    // });
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
