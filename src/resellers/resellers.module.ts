import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResellersController } from './resellers.controller';
import { ResellersService } from './resellers.service';
import { Reseller, resellerSchema } from './Schemas/reseller.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reseller.name, schema: resellerSchema },
    ]),
  ],
  controllers: [ResellersController],
  providers: [ResellersService],
})
export class ResellersModule {}
