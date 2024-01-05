import { Injectable } from '@nestjs/common';
import { JsonSerializerDTO, ProcessedJsonDTO } from './dtos';
import { mapToProcessedJsonArray } from './helpers';

@Injectable()
export class JsonSerializerService {
  processEmails(records: JsonSerializerDTO): any {
    return mapToProcessedJsonArray(records);
  }
}
