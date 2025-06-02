import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createTransport } from 'nodemailer';
import { EventPattern } from '@nestjs/microservices';

const configEmail = createTransport({
  service: 'gmail',
  auth: {
    user: 'duynguyen.workspace@gmail.com',
    pass: 'aplc yzqv yvet ykhm',
  },
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern("send_confirm_mail")
  sendConfirmMail() {
    let confirmMail = {
      from: 'duynguyen.workspace@gmail.com',
      to: 'duynguyen.workspace@gmail.com',
      subject: 'Nodeadv04 confirm order mail',
      html: `<h2 style="color: blue">Xac nhan don hang</h2><p>can mua 100 macbook</p>`, // index.html -> css (inline CSS)
    };

    configEmail.sendMail(confirmMail, (error) => error);
  }

  @EventPattern("send_success_mail")
  sendSuccessMail() {
    let successMail = {
      from: 'duynguyen.workspace@gmail.com',
      to: 'duynguyen.workspace@gmail.com',
      subject: 'Nodeadv04 success order mail',
      html: `<h1 style="color: red">Tao don hang thanh cong</h1><p>mua 100 macbook thanh cong</p>`, // index.html -> css (inline CSS)
    };

    configEmail.sendMail(successMail, (error) => error);
  }
}
