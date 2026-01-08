import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = "PL") {
    const settings = await this.prisma.settings.findMany({
      include: {
        translations: {
          where: { language },
        },
      },
    });

    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting.translations[0]?.value || '';
      return acc;
    }, {});
  }

  async update(key: string, data: any) {
    const setting = await this.prisma.settings.findUnique({ where: { key } });
    
    if (!setting) {
      return this.prisma.settings.create({
        data: {
          key,
          translations: {
            create: data.translations,
          },
        },
      });
    }

    return this.prisma.settings.update({
      where: { key },
      data: {},
    });
  }
}
