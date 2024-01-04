import { Body, Controller, Post } from '@nestjs/common';
import {  ProcessedJsonDTO, JsonSerializerDTO } from './dtos';
import { JsonSerializerService } from './json-serializer.service';

@Controller('email')
export class JsonSerializerController {
  constructor(private readonly jsonSerializerService: JsonSerializerService) {}

  @Post('process')
  processEmail(@Body() email: JsonSerializerDTO): ProcessedJsonDTO {
    return this.jsonSerializerService.processEmails(email);
  }
}
