import { Controller, Get, Param } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/:filePath')
  async parseEmail(@Param('filePath') filePath: string): Promise<any> {
    try {
      const jsonContent = await this.emailService.parseEmail(filePath);
      return jsonContent || { error: 'No JSON content found in the email.' };
    } catch (error) {
      console.error('Error parsing email:', error.message);
      return { error: 'An error occurred while parsing the email.' };
    }
  }
}
