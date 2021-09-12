import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResellersRepository } from './resellers.repository';
import { Reseller, resellerDocument } from './Schemas/reseller.schema';

@Injectable()
export class ResellersService {
  constructor(
    @InjectModel(Reseller.name) private resellerModel: Model<resellerDocument>,
    private resellersRepository: ResellersRepository,
  ) {}

  private readonly logger = new Logger(ResellersService.name);

  async getAll(): Promise<Reseller[]> {
    return this.resellerModel.find().exec();
  }

  async getByEmail(email: string): Promise<Reseller> {
    this.logger.log(`Validando user ${email} no banco de dados`);
    const users = await this.getAll();
    const matchedUser = users.filter(
      (user) => this.resellersRepository.decryptData(user.email) === email,
    );
    if (matchedUser && matchedUser.length) {
      return matchedUser[0];
    } else {
      throw new UnauthorizedException();
    }
  }

  async create(reseller: Reseller): Promise<Reseller> {
    this.logger.log(`Salvando revendedor no Banco de Dados`);
    try {
      const newReseller = new this.resellerModel(reseller);
      return newReseller.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async encryptReseller(data: Reseller): Promise<Reseller> {
    return this.resellersRepository.encryptAllData(data);
  }
}
