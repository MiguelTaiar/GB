import {
  InternalServerErrorException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reseller } from './Schemas/reseller.schema';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResellersRepository {
  private readonly logger = new Logger(ResellersRepository.name);

  async encryptAllData(data: Reseller): Promise<Reseller> {
    try {
      const hash = await bcrypt.hash(
        data.password,
        parseInt(process.env.HASH_SALT_ROUNDS),
      );

      return {
        fullName: data.fullName,
        cpf: this.encryptData(data.cpf),
        email: this.encryptData(data.email),
        password: hash,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  encryptData(data: string): string {
    this.logger.log(`Encriptando ${data}`);
    return CryptoJS.AES.encrypt(data, process.env.CRYPTO_KEY).toString();
  }

  decryptData(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, process.env.CRYPTO_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  findUser(users: Array<Reseller>, data: string, dataType: string): Reseller {
    const matchedUser = users.filter(
      (user) => this.decryptData(user[dataType]) === data,
    );
    if (matchedUser && matchedUser.length) {
      return matchedUser[0];
    } else {
      throw new UnauthorizedException();
    }
  }
}
