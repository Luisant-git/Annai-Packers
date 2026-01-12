// src/mail/dto/create-mail.dto.ts
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMailDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  moveFrom: string;

  @IsNotEmpty()
  moveTo: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  message?: string;
}
