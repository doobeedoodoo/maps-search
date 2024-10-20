import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type Response<T> = {
  meta: any; // TODO: update
  data: T;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.handleResponse(res, context)),
      catchError((err: HttpException) => throwError(() => err)),
    );
  }

  handleResponse(res: any, context: ExecutionContext) {
    return {
      meta: {
        path: context.switchToHttp().getRequest().url,
        count: res.length,
      },
      data: res,
    };
  }
}
