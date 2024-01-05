import { Injectable } from '@nestjs/common';
import { EmailHelper } from './email.helper';

@Injectable()
export class EmailService {
  async parseEmail(filePath: string): Promise<any> {
    const jsonContent = await EmailHelper.parseEmail(filePath);
    return jsonContent;
  }
}
