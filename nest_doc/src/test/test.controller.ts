import { Controller, Get, HttpException } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private catsService: TestService) {}

  @Get()
  // @UseFilters(HttpExceptionFilter)
  async getTest() {
    throw new HttpException('여기는 test 컨트롤러입니다.', 400);
    return 'test get';
  }
}
