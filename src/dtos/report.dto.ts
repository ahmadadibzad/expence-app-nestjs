import { Optional } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @Optional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @Optional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }

  id: string;
  source: string;
  amount: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  type: ReportType;

  // Add a property named createdAt and transform it instead of this.created_at
  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }
}
