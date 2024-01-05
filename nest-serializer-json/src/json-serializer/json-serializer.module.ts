import { Module } from '@nestjs/common';
import { JsonSerializerController } from './json-serializer.controller';
import { JsonSerializerService } from './json-serializer.service';
import { JsonSerializerHelper } from './json-serializer.helper';

@Module({
  imports: [],
  controllers: [JsonSerializerController],
  providers: [JsonSerializerService, JsonSerializerHelper],
})
export class JsonSerializerModule {}
