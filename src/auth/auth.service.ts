import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ResellersService } from 'src/resellers/resellers.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private resellersService: ResellersService) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Validando usuario: ${email}`);

    const user = await this.resellersService.getByEmail(email);
    this.logger.log(`User encontrado: ${user.fullName}`);

    const match = await this.checkPassword(pass, user.password);
    if (user && match) {
      return { ...user['_doc'] };
    }

    this.logger.error(`User nao encontrado ou senha invalida`);
    throw new UnauthorizedException();
  }

  async checkPassword(pass: string, hash: string): Promise<boolean> {
    this.logger.log(`Comparando: ${pass} com ${hash}`);
    try {
      const match = await bcrypt.compare(pass, hash);
      console.log({ match });
      return match;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
