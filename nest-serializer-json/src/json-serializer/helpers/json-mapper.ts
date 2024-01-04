import { JsonSerializerDTO } from "../dtos";

export function mapToProcessedJsonArray(inputArray: JsonSerializerDTO): any[] {
    return inputArray.Records.map((input) => ({
      spam: `spamVerdic a boolean, PASS = ${input.ses.receipt.spamVerdict.status === 'PASS'}`,
      virus: `virusVerdic a boolean, PASS = ${input.ses.receipt.virusVerdict.status === 'PASS'}`,
      dns: `spfVerdic, dkimVeredict, dmarcVeredict a boolean, si todos PASS = ${
        input.ses.receipt.spfVerdict.status === 'PASS' &&
        input.ses.receipt.dkimVerdict.status === 'PASS' &&
        input.ses.receipt.dmarcVerdict.status === 'PASS'
      }`,
      mes: `${new Date(input.ses.mail.timestamp).toLocaleString('en-US', { month: 'long' })} como texto`,
      retrasado: `processingTimeMillis a boolean, > 1000 = ${input.ses.receipt.processingTimeMillis > 1000}`,
      emisor: `${input.ses.mail.source.split('@')[0]} a usuario de correo sin @dominio.com`,
      receptor: input.ses.mail.destination.map((email: string) => `${email.split('@')[0]} a usuarios de correo sin @dominio.com`),
    }));
  }
  