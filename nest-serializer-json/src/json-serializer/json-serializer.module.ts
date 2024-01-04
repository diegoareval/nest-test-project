import { Module } from '@nestjs/common';
import { JsonSerializerController } from './json-serializer.controller';
import { JsonSerializerService } from './json-serializer.service';

@Module({
    imports: [],
    controllers: [JsonSerializerController],
    providers: [JsonSerializerService],
  })
  
export class JsonSerializerModule {}
