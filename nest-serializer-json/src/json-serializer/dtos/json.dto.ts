import { IsString, IsObject, ValidateNested, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ActionDTO {
  @IsString()
  type: string;

  @IsString()
  topicArn: string;
}

class SpamVerdictDTO {
  @IsString()
  status: string;
}

class VirusVerdictDTO {
  @IsString()
  status: string;
}

class SpfVerdictDTO {
  @IsString()
  status: string;
}

class DkimVerdictDTO {
  @IsString()
  status: string;
}

class DmarcVerdictDTO {
  @IsString()
  status: string;
}

class ReceiptDTO {
  @IsString()
  timestamp: string;

  @IsNumber()
  processingTimeMillis: number;

  @IsArray()
  recipients: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => SpamVerdictDTO)
  spamVerdict: SpamVerdictDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => VirusVerdictDTO)
  virusVerdict: VirusVerdictDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => SpfVerdictDTO)
  spfVerdict: SpfVerdictDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => DkimVerdictDTO)
  dkimVerdict: DkimVerdictDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => DmarcVerdictDTO)
  dmarcVerdict: DmarcVerdictDTO;

  @IsString()
  dmarcPolicy: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ActionDTO)
  action: ActionDTO;
}

class HeadersDTO {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

class CommonHeadersDTO {
  @IsString()
  returnPath: string;

  @IsArray()
  from: string[];

  @IsString()
  date: string;

  @IsArray()
  to: string[];

  @IsString()
  messageId: string;

  @IsString()
  subject: string;
}

class MailDTO {
  @IsString()
  timestamp: string;

  @IsString()
  source: string;

  @IsString()
  messageId: string;

  @IsArray()
  destination: string[];

  @IsBoolean()
  headersTruncated: boolean;

  @IsArray()
  headers: HeadersDTO[];

  @IsObject()
  @ValidateNested()
  @Type(() => CommonHeadersDTO)
  commonHeaders: CommonHeadersDTO;
}

class SesDtoSlice {
    @IsObject()
    @ValidateNested()
    @Type(() => ReceiptDTO)
    receipt: ReceiptDTO;
  
    @IsObject()
    @ValidateNested()
    @Type(() => MailDTO)
    mail: MailDTO;
}

class SesDTO {
  @IsString()
  eventVersion: string;

  @IsObject()
  @ValidateNested()
  @Type(() => SesDtoSlice)
  ses: SesDtoSlice;

  @IsString()
  eventSource: string;

}

export class JsonSerializerDTO {
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => SesDTO)
  Records: SesDTO[];
}



