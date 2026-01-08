import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = 'PL', featured?: boolean, limit?: number) {
    const where = featured !== undefined ? { featured, published: true } : { published: true };
    
    return this.prisma.blogPost.findMany({
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
          take: 1,
        },
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  }

  async findBySlug(slug: string, language: string = 'PL') {
    const post = await this.prisma.blogPost.findUnique({
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
      },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  async create(data: any) {
    const slug = slugify(data.translations[0].title, { lower: true, strict: true });
    
    return this.prisma.blogPost.create({
      data: {
        slug,
        published: data.published || false,
        featured: data.featured || false,
        publishedAt: data.published ? new Date() : null,
        translations: {
          create: data.translations,
        },
        categories: data.categoryIds ? {
          create: data.categoryIds.map((categoryId: string) => ({ categoryId })),
        } : undefined,
        images: data.images ? {
          create: data.images,
        } : undefined,
      },
      include: {
        translations: true,
        categories: true,
        images: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.blogPost.update({
      where: { id },
      data: {
        published: data.published,
        featured: data.featured,
        publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt,
      },
      include: {
        translations: true,
        categories: true,
        images: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
