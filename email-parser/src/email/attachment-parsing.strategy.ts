import { Injectable } from '@nestjs/common';
import { EmailParsingStrategy } from './interfaces';
import { Attachment, MailObject } from './interfaces';

@Injectable()
export class AttachmentParsingStrategy implements EmailParsingStrategy {
  private mailObject: MailObject;

  constructor(mailObject: MailObject) {
    this.mailObject = mailObject;
    this.applyStrategy = this.applyStrategy.bind(this); // Bind the method to the current instance
  }

  applyStrategy(data: any): void {
    const attachment: Attachment = {
      filename: data.filename,
      content: '',
    };

    data.content.on('data', (chunk: Buffer) => {
      attachment.content += chunk.toString();
    });

    data.content.on('end', () => {
      this.mailObject.attachments.push(attachment);
      data.release();
    });
  }
}