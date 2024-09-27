import { Controller, Get } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'users' })
@ApiTags('Users')
export class UserController {
  constructor(private configurationService: ConfigurationService) {}

  @Get('me')
  getCurrentUserInfo() {
    return {
      id: 1234,
      useName: 'customer',
    };
  }
}
