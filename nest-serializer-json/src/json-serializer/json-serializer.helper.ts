import { Injectable } from '@nestjs/common';
import { JsonSerializerDTO, ProcessedJsonDTO, SesDtoSlice } from './dtos';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class JsonSerializerHelper {
  mapToProcessedJsonArray(inputArray: JsonSerializerDTO): ProcessedJsonDTO[] {
    return inputArray.Records.map((record) => {
      const sesDTO = plainToInstance(SesDtoSlice, record.ses);
      return {
        spam: this.isStatusPass(sesDTO.receipt.spamVerdict.status),
        virus: this.isStatusPass(sesDTO.receipt.virusVerdict.status),
        dns: Boolean(
          this.isStatusPass(sesDTO.receipt.spfVerdict.status) &&
            this.isStatusPass(sesDTO.receipt.dkimVerdict.status) &&
            this.isStatusPass(sesDTO.receipt.dmarcVerdict.status),
        ),
        mes: this.formatTimestamp(sesDTO.mail.timestamp),
        retrasado: this.isProcessingTimeDelayed(
          sesDTO.receipt.processingTimeMillis,
        ),
        emisor: this.extractUsername(sesDTO.mail.source),
        receptor: this.extractUsernames(sesDTO.mail.destination),
      };
    });
  }

  private isStatusPass(value: string, valueShouldBe: string = 'PASS'): boolean {
    return value === valueShouldBe;
  }

  private isProcessingTimeDelayed(value: number): boolean {
    return value > 1000;
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
