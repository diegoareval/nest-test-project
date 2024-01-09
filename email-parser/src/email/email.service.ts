import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { MailParser, Headers } from 'mailparser';
import { EmailData, MailObject, EmailParsingStrategy } from './interfaces';

@Injectable()
export class EmailService {

  private parser: MailParser;
  private mailObject: MailObject;
  private parsingStrategy: EmailParsingStrategy;

  constructor(@Inject('EmailParsingStrategy') private readonly strategy: EmailParsingStrategy) {
    this.parser = new MailParser();
    this.mailObject = {
      attachments: [],
      text: {},
      headers: {},
    };
    this.parsingStrategy = strategy;
    this.setupParser();
  }

  private setupParser(): void {
    this.parser.on('headers', (headers: Headers) => {
      const headerObj = Object.fromEntries(headers);
      this.mailObject.headers = headerObj;
    });

    this.parser.on('data', (data) => {
      this.parsingStrategy.applyStrategy(data);
    });

    this.parser.on('end', () => {
      this.resolvePromise(this.mailObject);
    });

    this.parser.on('error', (err) => {
      console.log('error', err);
      this.rejectPromise(err);
    });
  }

  private promiseResolver: (value?: MailObject) => void;
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