import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsUUID,
} from "class-validator";

export class CreateSniffDto {
  @IsNotEmpty()
  @IsUUID()
  run_id: string;

  @IsIn(["1", "2", "3", "4", "5", "6", "7", "8"])
  station: string;

  @IsBoolean()
  is_positive_indication: boolean;

  @IsDateString()
  time: string;
}

export class CreateSniffWithResultDto extends CreateSniffDto {
  @IsIn(["true_positive", "false_positive", "false_negative", "true_negative"])
  result: string;
}

export class UpdateSniffDto {
  @IsBoolean()
  is_positive_indication: boolean;
}

export class UpdateSniffWithResultDto extends UpdateSniffDto {
  @IsIn(["true_positive", "false_positive", "false_negative", "true_negative"])
  result: string;
}
