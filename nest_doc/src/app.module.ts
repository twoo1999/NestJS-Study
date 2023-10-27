import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { testMiddleware } from './middleware/test.middleware';
import { TestModule } from './test/test.module';

@Module({
  imports: [CatsModule, TestModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 기본 적용
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    // 객체 적용
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'cats/:id', method: RequestMethod.GET });
    // 모든 method
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'cats/*', method: RequestMethod.ALL });
    // 컨트롤러 적용
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);
    // 제외 적용
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude({ path: 'cats', method: RequestMethod.POST })
    //   .forRoutes(CatsController);
    // 함수형 미들웨어
    // consumer.apply(logger).forRoutes(CatsController);
    // 미들웨어 여러개
    // consumer.apply(logger, testMiddleware).forRoutes(CatsController);
  }
}
