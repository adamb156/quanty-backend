import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  findAll(
    @Query('lang') lang?: string,
    @Query('featured') featured?: string,
    @Query('limit') limit?: string,
  ) {
    const language = lang === 'en' ? 'EN' : 'PL';
    const isFeatured = featured === 'true' ? true : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    return this.blogService.findAll(language, isFeatured, limitNum);
  }

  @Get(':slug')
  findBySlug(
    @Param('slug') slug: string,
    @Query('lang') lang?: string,
  ) {
    const language = lang === 'en' ? 'EN' : 'PL';
    return this.blogService.findBySlug(slug, language);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() data: any) {
    return this.blogService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() data: any) {
    return this.blogService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
