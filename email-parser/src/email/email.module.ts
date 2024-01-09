import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { AttachmentParsingStrategy } from './attachment-parsing.strategy';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [
    EmailService,
    {
      provide: 'EmailParsingStrategy', // String identifier as a token
      useClass: AttachmentParsingStrategy, // Implementation class
    },
  ],
})
export class EmailModule {}