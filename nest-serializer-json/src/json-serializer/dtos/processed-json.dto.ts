import { IsArray, IsBoolean, IsString } from "class-validator";

export class ProcessedJsonDTO {
    @IsBoolean()
    spam: boolean;
  
    @IsBoolean()
    virus: boolean;
  
    @IsBoolean()
    dns: boolean;
  
    @IsString()
    mes: string;
  
    @IsBoolean()
    retrasado: boolean;
  
    @IsString()
    emisor: string;
  
    @IsArray()
    receptor: string[];
  }