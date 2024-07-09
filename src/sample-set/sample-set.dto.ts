import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class SampleSetDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  sample_ehr_uids: string[];

  @IsDateString()
  date_time: string;
}

export class SampleSetDbDto {
  @IsString()
  @IsNotEmpty()
  sample_ehr_uids: string;

  @IsDate()
  date: string;

  @IsDateString()
  date_time: string;
}
