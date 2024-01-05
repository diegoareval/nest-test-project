import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { HealtCheckModule } from './healt-check/healt-check.module';

@Module({
  imports: [EmailModule, HealtCheckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
