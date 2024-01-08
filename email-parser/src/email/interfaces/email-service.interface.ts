import { EmailData } from "./email-processed.interface";

export interface EmailServiceInterface {
    parseEmail(filePath: string): Promise<EmailData | never>;
  }