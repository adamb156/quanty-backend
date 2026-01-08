import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  create(@Body() data: any) {
    return this.contactService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contactService.findAll();
  }

  @Get('subjects')
  getSubjects(@Query('lang') lang?: string) {
    return this.contactService.getSubjects(lang || 'pl');
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.contactService.delete(id);
  }
}
