// src/mail/mail.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('enquiry')
  async packersEnquiry(@Body() dto: CreateMailDto) {
    await  Promise.all([
      this.mailService.sendPackersAck(dto),
      this.mailService.sendAdminNotification(dto),
    ]);
    return { ok: true };
  }
}