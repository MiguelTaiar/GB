import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reseller, resellerDocument } from './Schemas/reseller.schema';

@Injectable()
export class ResellersService {
  constructor(
    @InjectModel(Reseller.name) private resellerModel: Model<resellerDocument>,
  ) {}

  private readonly logger = new Logger(ResellersService.name);

  async getAll(): Promise<Reseller[]> {
    return this.resellerModel.find().exec();
  }

  async getByEmail(email: string): Promise<Reseller> {
    return this.resellerModel.findOne({ email });
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
}
