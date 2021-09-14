import {
  Controller,
  Logger,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { OrderRequest } from './interfaces/order.interface';
import { Order } from './Schemas/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  private readonly logger = new Logger(OrdersController.name);

  // @UseGuards(JwtAuthGuard)
  @Post('/addOrder')
  async addOrder(@Body() order: OrderRequest): Promise<Order> {
    this.logger.log(`Iniciando chamada para addOrder`);

    return this.ordersService.processOrder(order);
  }

  @Get('/getOrders/:cpf')
  async getOrders(@Param('cpf') cpf: string): Promise<Array<Order>> {
    this.logger.log(`Iniciando chamada para getOrders para cpf: ${cpf}`);
    return this.ordersService.getOrderByCpf(cpf);
  }
}
