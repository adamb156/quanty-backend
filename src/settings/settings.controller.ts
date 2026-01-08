import { Controller, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  findAll(@Query('lang') lang?: string) {
    const language = lang === 'en' ? "EN" : "PL";
    return this.settingsService.findAll(language);
  }

  @Patch(':key')
  @UseGuards(JwtAuthGuard)
  update(@Param('key') key: string, @Body() data: any) {
    return this.settingsService.update(key, data);
  }
}
