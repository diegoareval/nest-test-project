import { ParsedMail } from 'mailparser';

export interface MailParser {
  parseMail(mail: ParsedMail): Promise<void>;
}