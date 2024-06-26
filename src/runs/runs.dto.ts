import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateRunDto {
  @IsNotEmpty()
  @IsUUID()
  session_id: string;

  @IsNotEmpty()
  positive_stations: string;

  @IsNotEmpty()
  sample_battery: CreateSampleBattery[];

  @IsDateString()
  start_time: string;
}

export class UpdateRunDbDto {
  @IsOptional()
  @IsNotEmpty()
  positive_stations?: string;

  @IsOptional()
  @IsNotEmpty()
  sample_battery?: CreateSampleBattery[];

  @IsOptional()
  @IsDateString()
  end_time?: string;
}

export class UpdateRunDto {
  @IsOptional()
  @IsNotEmpty()
  positive_stations?: string;

  @IsOptional()
  @IsNotEmpty()
  sample_battery?: CreateSampleBattery[];
}

export class EndRunDto {
  @IsDateString()
  end_time: string;
}

export class CreateSampleBattery {
  @IsNotEmpty()
  station: string;
  @IsNotEmpty()
  sample_ehr_uid: string;
}
