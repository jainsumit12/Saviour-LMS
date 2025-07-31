import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendPasswordMail(to: string, password: string) {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) return;
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to,
      subject: 'Your account password',
      text: `Your password is: ${password}`,
    });
  }
}
