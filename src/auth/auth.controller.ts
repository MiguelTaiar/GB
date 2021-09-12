import { Controller, Logger, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    this.logger.log(`Iniciando chamada para ${AuthController.name}/login`);
    return this.authService.login(req.user);
  }
}
