import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  findAll(@Query('lang') lang?: string) {
    const language = lang === 'en' ? "EN" : "PL";
    return this.servicesService.findAll(language);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() data: any) {
    return this.servicesService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() data: any) {
    return this.servicesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.servicesService.delete(id);
  }
}
