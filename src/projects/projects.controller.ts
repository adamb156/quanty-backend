import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll(
    @Query('lang') lang?: string,
    @Query('featured') featured?: string,
  ) {
    const language = lang === 'en' ? "EN" : "PL";
    const isFeatured = featured === 'true' ? true : undefined;
    return this.projectsService.findAll(language, isFeatured);
  }

  @Get(':slug')
  findBySlug(
    @Param('slug') slug: string,
    @Query('lang') lang?: string,
  ) {
    const language = lang === 'en' ? "EN" : "PL";
    return this.projectsService.findBySlug(slug, language);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() data: any) {
    return this.projectsService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() data: any) {
    return this.projectsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
