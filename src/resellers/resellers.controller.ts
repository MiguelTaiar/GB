import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ResellersService } from './resellers.service';
import { Reseller } from './Schemas/reseller.schema';

@Controller('resellers')
export class ResellersController {
  constructor(private resellersService: ResellersService) {}

  @Get()
  getAll(): Promise<Reseller[]> {
    return this.resellersService.getAll();
  }

  @Post()
  async registerReseller(@Body() reseller: Reseller): Promise<Reseller> {
    try {
      return await this.resellersService.create(reseller);
    } catch (error) {
      if (error['_message'] === 'Reseller validation failed') {
        throw new HttpException(error['_message'], 400);
      }
    }
  }
}
