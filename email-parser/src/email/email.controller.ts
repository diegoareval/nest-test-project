import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmailService } from './email.service';


@Controller('mail-parsing')
export class EmailController {
  constructor(private readonly mailParsingService: EmailService) {}

  @Get()
  async parseEmail(@Query('filePath') filePath: string): Promise<any> {
    try {
      const result = await this.mailParsingService.parseEmail(filePath);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error };
    }
  }

}
