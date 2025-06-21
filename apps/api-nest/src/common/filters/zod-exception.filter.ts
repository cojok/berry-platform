import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';

@Catch(BadRequestException)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const status = exception.getStatus() || HttpStatus.BAD_REQUEST;
    const exceptionResponse = exception.getResponse();

    let errors: { path: string; message: string }[] = [];
    if (
      typeof exceptionResponse === 'object' &&
      'errors' in exceptionResponse
    ) {
      const errorDetails = exceptionResponse.errors;
      if (errorDetails instanceof ZodError) {
        errors = Object.entries(errorDetails.format()).map(([key, value]) => ({
          path: key,
          message: (value as unknown as { _errors: string[] })._errors.join(
            ', '
          ),
        }));
      } else if (Array.isArray(errorDetails)) {
        errors = errorDetails;
      }
    }
    response.status(status).send({
      statusCode: status,
      message: 'Validation failed',
      errors,
    });
  }
}
