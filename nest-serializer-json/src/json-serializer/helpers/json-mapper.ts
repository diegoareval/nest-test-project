import { JsonSerializerDTO } from '../dtos';

export function mapToProcessedJsonArray(inputArray: JsonSerializerDTO): any[] {
  return inputArray.Records.map((input) => ({
    spam: `spamVerdic a boolean, PASS = ${
      input.ses.receipt.spamVerdict.status === 'PASS'
    }`,
    virus: `virusVerdic a boolean, PASS = ${
      input.ses.receipt.virusVerdict.status === 'PASS'
    }`,
    dns: `spfVerdic, dkimVeredict, dmarcVeredict a boolean, si todos PASS = ${
      input.ses.receipt.spfVerdict.status === 'PASS' &&
      input.ses.receipt.dkimVerdict.status === 'PASS' &&
      input.ses.receipt.dmarcVerdict.status === 'PASS'
    }`,
    mes: formatTimestamp(input.ses.mail.timestamp),
    retrasado: `processingTimeMillis a boolean, > 1000 = ${
      input.ses.receipt.processingTimeMillis > 1000
    }`,
    emisor: extractUsername(input.ses.mail.source),
    receptor: extractUsernames(input.ses.mail.destination),
  }));
}

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString('en-US', { month: 'long' });
}

function extractUsername(email: string): string {
  return email.split('@')[0];
}

function extractUsernames(emails: string[]): string[] {
  return emails.map((email) => extractUsername(email));
}
