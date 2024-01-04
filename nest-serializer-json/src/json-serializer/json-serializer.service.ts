import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JsonSerializerDTO, ProcessedJsonDTO } from './dtos';
import { mapToProcessedJsonArray } from './helpers/json-mapper';

@Injectable()
export class JsonSerializerService {
  processEmails(records: JsonSerializerDTO): any {
    return mapToProcessedJsonArray(records);
  }
}
