import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { MailParser } from 'mailparser';

@Injectable()
export class EmailService {
  async parseEmail(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(filePath);
      const mailparser = new MailParser({});

      mailparser.on('data', (data: any) => {
        if (data.type === 'attachment' && data.filename === 'data.json') {
          resolve(JSON.parse(data.content.toString()));
        }
      });

      mailparser.on('end', () => {
        reject('JSON attachment not found in the email.');
      });

      fileStream.pipe(mailparser);
    });
  }
}
