import { Controller, Get } from '@nestjs/common';
import { ResellersService } from './resellers.service';
import { Reseller } from './Schemas/reseller.schema';

@Controller('resellers')
export class ResellersController {
  constructor(private resellersService: ResellersService) {}

  @Get()
  getAll(): Promise<Reseller[]> {
    return this.resellersService.getAll();
  }
}
