import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = "PL") {
    return this.prisma.service.findMany({
      where: { published: true },
      include: {
        translations: {
          where: { language },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.service.create({
      data: {
        slug: data.slug,
        icon: data.icon,
        published: data.published || true,
        order: data.order || 0,
        translations: {
          create: data.translations,
        },
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.service.update({
      where: { id },
      data: {
        icon: data.icon,
        published: data.published,
        order: data.order,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
