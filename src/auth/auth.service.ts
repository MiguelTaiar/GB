import { Injectable } from '@nestjs/common';
import { ResellersService } from 'src/resellers/resellers.service';
import { Reseller } from 'src/resellers/Schemas/reseller.schema';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(private resellersService: ResellersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.resellersService.getByEmail(email);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  encryptData(data: Reseller): Reseller {
    return {
      fullName: data.fullName,
      cpf: CryptoJS.AES.encrypt(data.cpf, process.env.CRYPTO_KEY).toString(),
      email: CryptoJS.AES.encrypt(
        data.email,
        process.env.CRYPTO_KEY,
      ).toString(),
      password: CryptoJS.AES.encrypt(
        data.password,
        process.env.CRYPTO_KEY,
      ).toString(),
    };
  }

  decryptData(data: Reseller): Reseller {
    const { cpf, email, password } = data;
    const cpfBytes = CryptoJS.AES.decrypt(cpf, process.env.CRYPTO_KEY);
    const emailBytes = CryptoJS.AES.decrypt(email, process.env.CRYPTO_KEY);
    const passwordBytes = CryptoJS.AES.decrypt(
      password,
      process.env.CRYPTO_KEY,
    );

    return {
      fullName: data.fullName,
      cpf: cpfBytes.toString(CryptoJS.enc.Utf8),
      email: emailBytes.toString(CryptoJS.enc.Utf8),
      password: passwordBytes.toString(CryptoJS.enc.Utf8),
    };
  }
}
