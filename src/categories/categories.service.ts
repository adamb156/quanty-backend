import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(type: string, language: string = "PL") {
    return this.prisma.category.findMany({
      where: { type },
      include: {
        translations: {
          where: { language },
        },
      },
    });
  }

  async create(data: any) {
    return this.prisma.category.create({
      data: {
        slug: data.slug,
        type: data.type,
        translations: {
          create: data.translations,
        },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
