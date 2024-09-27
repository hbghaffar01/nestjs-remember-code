import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;

    Logger.log(
      `Incoming Request: [${method}] ${url} - User Agent: ${userAgent} - IP: ${ip}`,
      'HTTP Request',
    );

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const responseTime = Date.now() - now;

        Logger.log(
          `Response: [${method}] ${url} - Status Code: ${statusCode} - Response Time: ${responseTime}ms`,
          'HTTP Response',
        );
      }),
    );
  }
}
