import { IsString, IsObject, ValidateNested, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ActionDTO {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  topicArn: string;
}

class SpamVerdictDTO {
  @ApiProperty()
  @IsString()
  status: string;
}

class VirusVerdictDTO {
  @ApiProperty()
  @IsString()
  status: string;
}

class SpfVerdictDTO {
  @ApiProperty()
  @IsString()
  status: string;
}

class DkimVerdictDTO {
  @ApiProperty()
  @IsString()
  status: string;
}

class DmarcVerdictDTO {
  @ApiProperty()
  @IsString()
  status: string;
}

class ReceiptDTO {
  @ApiProperty()
  @IsString()
  timestamp: string;

  @ApiProperty()
  @IsNumber()
  processingTimeMillis: number;

  @ApiProperty()
  @IsArray()
  recipients: string[];

  @ApiProperty({ type: SpamVerdictDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => SpamVerdictDTO)
  spamVerdict: SpamVerdictDTO;

  @ApiProperty({ type: VirusVerdictDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => VirusVerdictDTO)
  virusVerdict: VirusVerdictDTO;

  @ApiProperty({ type: SpfVerdictDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => SpfVerdictDTO)
  spfVerdict: SpfVerdictDTO;

  @ApiProperty({ type: DkimVerdictDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => DkimVerdictDTO)
  dkimVerdict: DkimVerdictDTO;

  @ApiProperty({ type: DmarcVerdictDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => DmarcVerdictDTO)
  dmarcVerdict: DmarcVerdictDTO;

  @ApiProperty()
  @IsString()
  dmarcPolicy: string;

  @ApiProperty({ type: ActionDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => ActionDTO)
  action: ActionDTO;
}

class HeadersDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  value: string;
}

class CommonHeadersDTO {
  @ApiProperty()
  @IsString()
  returnPath: string;

  @ApiProperty()
  @IsArray()
  from: string[];

  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsArray()
  to: string[];

  @ApiProperty()
  @IsString()
  messageId: string;

  @ApiProperty()
  @IsString()
  subject: string;
}

class MailDTO {
  @ApiProperty()
  @IsString()
  timestamp: string;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsString()
  messageId: string;

  @ApiProperty()
  @IsArray()
  destination: string[];

  @ApiProperty()
  @IsBoolean()
  headersTruncated: boolean;

  @ApiProperty()
  @IsArray()
  @Type(() => HeadersDTO)
  headers: HeadersDTO[];

  @ApiProperty({ type: CommonHeadersDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => CommonHeadersDTO)
  commonHeaders: CommonHeadersDTO;
}

export class SesDtoSlice {
  @ApiProperty({ type: ReceiptDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => ReceiptDTO)
  receipt: ReceiptDTO;

  @ApiProperty({ type: MailDTO })
  @IsObject()
  @ValidateNested()
  @Type(() => MailDTO)
  mail: MailDTO;
}

export class SesDTO {
  @ApiProperty()
  @IsString()
  eventVersion: string;

  @ApiProperty({ type: SesDtoSlice })
  @IsObject()
  @ValidateNested()
  @Type(() => SesDtoSlice)
  ses: SesDtoSlice;

  @ApiProperty()
  @IsString()
  eventSource: string;
}

export class JsonSerializerDTO {
  @ApiProperty({ type: [SesDTO] })
  @IsArray()
  @Type(() => SesDTO)
  Records: SesDTO[];
}
