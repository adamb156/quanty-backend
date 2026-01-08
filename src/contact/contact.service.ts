import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';

@Injectable()
export class ContactService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async create(data: any) {
    const message = await this.prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    });

    // Send email to admin
    await this.emailService.sendContactNotification(message);

    // Send confirmation to client
    await this.emailService.sendContactConfirmation(data.email, data.name);

    return { message: 'Message sent successfully', id: message.id };
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async delete(id: string) {
    return this.prisma.contactMessage.delete({ where: { id } });
  }

  async getSubjects(language: string) {
    const lang = language === 'en' ? 'EN' : 'PL';
    return this.prisma.contactSubject.findMany({
      include: {
        translations: {
          where: { language: lang as any },
        },
      },
      orderBy: { order: 'asc' },
    });
  }
}
