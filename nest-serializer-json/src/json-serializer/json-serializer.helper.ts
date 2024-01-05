import { Injectable } from '@nestjs/common';
import { JsonSerializerDTO, ProcessedJsonDTO, SesDtoSlice } from './dtos';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class JsonSerializerHelper {
  mapToProcessedJsonArray(inputArray: JsonSerializerDTO): ProcessedJsonDTO[] {
    return inputArray.Records.map((record) => {
      const sesDTO = plainToInstance(SesDtoSlice, record.ses);
      return {
        spam: Boolean(sesDTO.receipt.spamVerdict.status === 'PASS'),
        virus: Boolean(sesDTO.receipt.virusVerdict.status === 'PASS'),
        dns: Boolean(
          sesDTO.receipt.spfVerdict.status === 'PASS' &&
            sesDTO.receipt.dkimVerdict.status === 'PASS' &&
            sesDTO.receipt.dmarcVerdict.status === 'PASS',
        ),
        mes: this.formatTimestamp(sesDTO.mail.timestamp),
        retrasado: Boolean(sesDTO.receipt.processingTimeMillis > 1000),
        emisor: this.extractUsername(sesDTO.mail.source),
        receptor: this.extractUsernames(sesDTO.mail.destination),
      };
    });
  }

  private formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString('en-US', { month: 'long' });
  }

  private extractUsernames(emails: string[]): string[] {
    return emails.map((email) => this.extractUsername(email));
  }

  private extractUsername(email: string): string {
    return email.split('@')[0];
  }
}
