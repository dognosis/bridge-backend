import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from "class-validator";

export class CreateSessionDto {
  @IsNotEmpty()
  @IsUUID()
  dog_id: string;

  @IsOptional()
  @IsNotEmpty()
  eeg_file_path?: string;

  @IsOptional()
  @IsNotEmpty()
  video_file_path?: string;

  @IsOptional()
  @IsNotEmpty()
  notes?: string;

  @IsNumber()
  last_meal: number;

  @IsDateString()
  start_time: string;
}

export class CreateSessionWithTrainerIdDto extends CreateSessionDto {
  @IsNotEmpty()
  @IsUUID()
  trainer_id: string;
}

export class UpdateSessionDbDto {
  @IsOptional()
  @IsNotEmpty()
  eeg_file_path?: string;

  @IsOptional()
  @IsNotEmpty()
  video_file_path?: string;

  @IsOptional()
  @IsNotEmpty()
  notes?: string;

  @IsOptional()
  @IsNumber()
  last_meal?: number;

  @IsOptional()
  @IsDateString()
  end_time: string;
}

export class EndSessionDto {
  @IsDateString()
  end_time: string;
}
