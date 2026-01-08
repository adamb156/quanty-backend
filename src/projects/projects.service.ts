import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import slugify from 'slugify';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = "PL", featured?: boolean) {
    const where = featured !== undefined ? { featured, published: true } : { published: true };
    
    return this.prisma.project.findMany({
      where,
      include: {
        translations: {
          where: { language },
        },
        categories: {
          include: {
            category: {
              include: {
                translations: {
                  where: { language },
                },
              },
            },
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        videos: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string, language: string = "PL") {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language },
        },
        categories: {
          include: {
            category: {
              include: {
                translations: {
                  where: { language },
                },
              },
            },
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        videos: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async create(data: any) {
    const slug = slugify(data.translations[0].title, { lower: true, strict: true });
    
    return this.prisma.project.create({
      data: {
        slug,
        published: data.published || false,
        featured: data.featured || false,
        order: data.order || 0,
        translations: {
          create: data.translations,
        },
        categories: data.categoryIds ? {
          create: data.categoryIds.map((categoryId: string) => ({
            categoryId,
          })),
        } : undefined,
        images: data.images ? {
          create: data.images,
        } : undefined,
        videos: data.videos ? {
          create: data.videos,
        } : undefined,
      },
      include: {
        translations: true,
        categories: true,
        images: true,
        videos: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.project.update({
      where: { id },
      data: {
        published: data.published,
        featured: data.featured,
        order: data.order,
      },
      include: {
        translations: true,
        categories: true,
        images: true,
        videos: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
