import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateRunDto {
  @IsNotEmpty()
  @IsUUID()
  session_id: string;

  @IsNotEmpty()
  positive_stations: string;

  @IsNotEmpty()
  sample_battery: string;

  @IsDateString()
  start_time: string;
}

export class UpdateRunDbDto {
  @IsOptional()
  @IsNotEmpty()
  positive_stations?: string;

  @IsOptional()
  @IsNotEmpty()
  sample_battery?: string;

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
  sample_battery?: string;
}

export class EndRunDto {
  @IsDateString()
  end_time: string;
}
