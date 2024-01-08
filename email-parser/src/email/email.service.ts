import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { MailParser, Headers } from 'mailparser';
import { EmailData, EmailServiceInterface } from './interfaces';

@Injectable()
export class EmailService implements EmailServiceInterface{
  private parser: MailParser;

  constructor() {
    this.parser = new MailParser();
    this.setupParser();
  }

  private setupParser(): void {
    this.parser.on('headers', (headers: Headers) => {
      const headerObj = Object.fromEntries(headers);
      this.mailObject.headers = headerObj;
    });

    this.parser.on('data', (data) => {
      console.log("data", data.type)
      if (data.type === 'attachment') {
        this.mailObject.attachments.push(data);
        data.content.on('readable', () => data.content.read());
        data.content.on('end', () => data.release());
      } else {
        this.mailObject.text = data;
      }
    });

    this.parser.on('end', () => {
      this.resolvePromise(this.mailObject);
    });

    this.parser.on('error', (err) => {
      console.log('error', err);
      this.rejectPromise(err);
    });
  }

  private mailObject = {
    attachments: [],
    text: {},
    headers: {},
  };

  private promiseResolver: (value?: any) => void;
  private promiseRejecter: (reason?: any) => void;

  private createPromise(): Promise<EmailData | never> {
    return new Promise((resolve, reject) => {
      this.promiseResolver = resolve;
      this.promiseRejecter = reject;
    });
  }

  private resolvePromise(value?: any): void {
    if (this.promiseResolver) {
      this.promiseResolver(value);
    }
  }

  private rejectPromise(reason?: any): void {
    if (this.promiseRejecter) {
      this.promiseRejecter(reason);
    }
  }

  async parseEmail(filePath: string): Promise<EmailData | never> {
    const input = fs.createReadStream(filePath);
    input.pipe(this.parser);

    return this.createPromise();
  }
}
