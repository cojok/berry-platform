import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema?: ZodSchema<unknown>) {} // 🔹 Accept explicit schema

  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const schema =
      this.schema ?? (metadata.metatype as unknown as ZodSchema<unknown>);

    if (
      schema === null ||
      schema === undefined ||
      typeof schema.parse !== 'function'
    ) {
      return value;
    }
    const parse = schema.safeParse(value);
    if (!parse.success) {
      throw new BadRequestException(parse.error);
    }
    return parse.data;
  }
}
