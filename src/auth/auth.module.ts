import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResellersModule } from 'src/resellers/resellers.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.stategy';

@Module({
  imports: [ResellersModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
