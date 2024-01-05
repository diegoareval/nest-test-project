import { Body, Controller, Post } from '@nestjs/common';
import { ProcessedJsonDTO, JsonSerializerDTO } from './dtos';
import { JsonSerializerService } from './json-serializer.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('JsonParser')
@Controller('email')
export class JsonSerializerController {
  constructor(private readonly jsonSerializerService: JsonSerializerService) {}

  @Post('process')
  @ApiResponse({
    status: 201,
    description: 'Data parsed',
    type: ProcessedJsonDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  processEmail(@Body() email: JsonSerializerDTO): ProcessedJsonDTO {
    return this.jsonSerializerService.processEmails(email);
  }
}
