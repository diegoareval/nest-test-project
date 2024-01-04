import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonSerializerModule } from './json-serializer/json-serializer.module';

@Module({
  imports: [JsonSerializerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
