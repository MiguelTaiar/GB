import { Body, Controller, Post } from '@nestjs/common';
import { Reseller } from 'src/resellers/Schemas/reseller.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/encryptData')
  encryptResellerData(@Body() data: Reseller): Reseller {
    return this.authService.encryptData(data);
  }

  @Post('/decryptData')
  decryptResellerData(@Body() data: Reseller): Reseller {
    return this.authService.decryptData(data);
  }
}
