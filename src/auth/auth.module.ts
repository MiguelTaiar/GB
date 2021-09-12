import { Module } from '@nestjs/common';
import { ResellersModule } from 'src/resellers/resellers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from './local.stategy';
import { JwtStrategy } from './jwt.stategy';

import { jwtConstants } from './constants';

@Module({
  imports: [
    ResellersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
