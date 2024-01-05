import { Injectable } from '@nestjs/common';
import { JsonSerializerDTO, ProcessedJsonDTO } from './dtos';
import { JsonSerializerHelper } from './json-serializer.helper';

@Injectable()
export class JsonSerializerService {
  constructor(private readonly jsonSerializerHelper: JsonSerializerHelper) {}
  processEmails(records: JsonSerializerDTO): ProcessedJsonDTO {
    return this.jsonSerializerHelper.mapToProcessedJsonArray(records).shift();
  }
}
