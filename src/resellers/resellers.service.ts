import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reseller, resellerDocument } from './Schemas/reseller.schema';

@Injectable()
export class ResellersService {
  constructor(
    @InjectModel(Reseller.name) private resellerModel: Model<resellerDocument>,
  ) {}

  async getAll(): Promise<Reseller[]> {
    return this.resellerModel.find().exec();
  }
}
