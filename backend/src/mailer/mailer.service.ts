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
    const data = await this.transporter.sendMail({
      from: 'noreply@miteshmalhotra.com',
      to,
      subject: 'Your account password',
      text: `Your password is: ${password}`,
    });
    console.log(data);
  }
}
