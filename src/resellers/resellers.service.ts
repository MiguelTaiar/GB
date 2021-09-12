import {
  HttpException,
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

  async create(reseller: Reseller): Promise<Reseller> {
    try {
      const newReseller = new this.resellerModel(reseller);
      return newReseller.save();
    } catch (error) {
      if (['message', 'status'].every((item) => item in error)) {
        this.logger.error(
          `Erro durante ${ResellersService.name}.create(). Erro: ${error.message}`,
        );
        throw new HttpException(error.message, error.status);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
