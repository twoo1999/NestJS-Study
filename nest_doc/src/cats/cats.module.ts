import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [CatsService],
})
export class CatsModule {}
