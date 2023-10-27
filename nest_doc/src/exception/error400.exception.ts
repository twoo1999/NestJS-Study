import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('커스텀 에러입니다.', HttpStatus.FORBIDDEN);
  }
}
