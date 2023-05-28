import { IsOptional, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  readonly name: string;
}
