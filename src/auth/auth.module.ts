import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResellersModule } from 'src/resellers/resellers.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [ResellersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
