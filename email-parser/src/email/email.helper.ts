import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
// import * as mailParser from 'mail-parser';

@Injectable()
export class EmailHelper {
  static async parseEmail(filePath: string): Promise<any> {
    const emailContent = fs.readFileSync(filePath, 'utf-8');
    const parsedEmail = "jfjf" // await mailParser.simpleParser(emailContent);

    // Extract JSON content from email
    const jsonContent = this.extractJSONContent(parsedEmail);

    return jsonContent;
  }

  private static extractJSONContent(parsedEmail: any): any {
    // Logic to extract JSON content from parsed email
    // Adjust this based on the structure of your email
    if (parsedEmail.attachments && parsedEmail.attachments.length > 0) {
      // Case 1: JSON as attachment
      const jsonAttachment = parsedEmail.attachments.find((attachment: any) =>
        attachment.filename.endsWith('.json')
      );

      if (jsonAttachment) {
        return JSON.parse(jsonAttachment.content.toString());
      }
    }

    // Case 2: JSON inside the body of the email
    if (parsedEmail.text && parsedEmail.text.includes('{"')) {
      const jsonString = parsedEmail.text.match(/({.*})/s);
      if (jsonString) {
        return JSON.parse(jsonString[0]);
      }
    }

    // Case 3: JSON inside a link in the body of the email
    if (parsedEmail.text && parsedEmail.text.includes('http')) {
      const jsonLink = parsedEmail.text.match(/(http.*\.json)/);
      if (jsonLink) {
        // You may need to fetch the JSON content from the link using an HTTP request
        // For simplicity, return the link for now
        return { link: jsonLink[0] };
      }
    }

    // No JSON content found
    return null;
  }
}
