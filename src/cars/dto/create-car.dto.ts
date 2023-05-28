import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  readonly id?: string;
  @IsString()
  @IsOptional()
  readonly name?: string;
}
