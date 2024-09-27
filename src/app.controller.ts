import {
  Controller,
  Get,
  NotFoundException,
  Res,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { Response } from 'express';

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  constructor(private configurationService: ConfigurationService) {}

  @Get()
  redirectToSwagger(@Res() response: Response) {
    if (!this.configurationService.isProduction) {
      return response.redirect(
        `/retails/${this.configurationService.currentVersion}/docs`,
      );
    } else throw new NotFoundException();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'up',
      tag: this.configurationService.buildTag,
      latest: this.configurationService.currentVersion,
    };
  }
}
