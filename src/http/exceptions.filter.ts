import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const errorResponse = {
      ...(typeof message === 'object' && message !== null
        ? message
        : { message }),
      statusCode: status,
    };

    Logger.error(
      `Error occurred: [${request.method}] ${request.url} - Status: ${status} - Message: ${JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : '',
      'ExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
