import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResellersService } from './resellers.service';
import { Reseller } from './Schemas/reseller.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('resellers')
export class ResellersController {
  constructor(private resellersService: ResellersService) {}

  private readonly logger = new Logger(ResellersController.name);

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<Reseller[]> {
    return this.resellersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getByEmail(@Query() email: string): Promise<Reseller> {
    this.logger.log(`Iniciando chamada para getByEmail para email: ${email}`);
    return this.resellersService.getByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async registerReseller(@Body() reseller: Reseller): Promise<Reseller> {
    this.logger.log(`Iniciando chamada para registerReseller`);
    try {
      return await this.resellersService.create(reseller);
    } catch (error) {
      if (error['_message'] === 'Reseller validation failed') {
        throw new HttpException(error['_message'], 400);
      }
    }
  }

  @Post('/encryptData')
  async encryptResellerData(@Body() data: Reseller): Promise<Reseller> {
    return this.resellersService.encryptReseller(data);
  }
}
