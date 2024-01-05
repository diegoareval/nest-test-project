import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { config } from '../config';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
