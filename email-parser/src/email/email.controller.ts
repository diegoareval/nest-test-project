import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProcessedEmail } from './interfaces/email-processed.interface';

@ApiTags('Email Parser')
@Controller('mail-parsing')
export class EmailController {
  constructor(private readonly mailParsingService: EmailService) {}

  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 201,
    description: 'Data parsed',
  })

  @Get()
  async parseEmail(@Query('filePath') filePath: string):  Promise<ProcessedEmail | never> {
    try {
      const result = await this.mailParsingService.parseEmail(filePath);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error, data: null };
    }
  }

}
