import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendContactNotification(message: any) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_FROM'),
      to: this.configService.get('SMTP_USER'),
      subject: `Nowa wiadomość z formularza: ${message.subject}`,
      html: `
        <h2>Nowa wiadomość kontaktowa</h2>
        <p><strong>Imię/Firma:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Telefon:</strong> ${message.phone || 'Nie podano'}</p>
        <p><strong>Temat:</strong> ${message.subject}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message.message}</p>
        <hr>
        <p><small>Data: ${new Date(message.createdAt).toLocaleString('pl-PL')}</small></p>
      `,
    });
  }

  async sendContactConfirmation(email: string, name: string) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_FROM'),
      to: email,
      subject: 'Potwierdzenie otrzymania wiadomości - Quanty',
      html: `
        <h2>Dziękujemy za kontakt!</h2>
        <p>Cześć ${name},</p>
        <p>Otrzymaliśmy Twoją wiadomość i odpowiemy najszybciej jak to możliwe.</p>
        <p>Zwykle odpowiadamy w ciągu 24 godzin w dni robocze.</p>
        <br>
        <p>Pozdrawiamy,<br>Zespół Quanty</p>
        <hr>
        <p><small>Agencja Interaktywna Quanty</small></p>
      `,
    });
  }
}
