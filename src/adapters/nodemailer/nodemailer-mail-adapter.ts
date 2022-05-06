import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0d5b3a044fa148",
    pass: "6d3efc532a8639"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body}: SendMailData){
    await transport.sendMail({
      from: 'Equipe Feedget <no-reply@feedget.com>',
      to: 'Nilton Mendes <nilton@feedget.com>',
      subject,
      html: body,
    });
  }
}