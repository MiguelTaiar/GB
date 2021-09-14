import { Injectable, Logger, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrdersRepository } from './orders.repository';
import { OrderRequest } from './interfaces/order.interface';
import { Order, orderDocument } from './Schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<orderDocument>,
    private ordersRepository: OrdersRepository,
  ) {}

  private readonly logger = new Logger(OrdersService.name);

  async processOrder(order: OrderRequest): Promise<Order> {
    this.logger.log(`Construindo dados para compra ${order.code}`);

    if (!(await this.ordersRepository.checkIfCpfExists(order.cpf))) {
      throw new HttpException(`Unauthorized: cpf nao cadastrado`, 401);
    }

    const normalizedOrder = this.ordersRepository.normalizeDataTypes(order);

    const cashbackPercent =
      await this.ordersRepository.calculateCashbackPercentage(normalizedOrder);

    const cashbackAmount = (cashbackPercent / 100) * order.price;

    const status = this.ordersRepository.checkOrderStatus(order.cpf);

    const newOrder = new this.orderModel({
      ...order,
      cashbackPercent,
      cashbackAmount,
      status,
    });

    return newOrder.save();
  }

  async getOrderByCpf(cpf: string): Promise<Array<Order>> {
    this.logger.log(`Coletando pedidos para cpf: ${cpf}`);
    return this.ordersRepository.getOrders('cpf', cpf);
  }

  async getCashbackAmount(cpf: string) {
    this.logger.log(`Formatando cpf: ${cpf}`);
    const cpfFormated = this.ordersRepository.formatCpf(cpf);

    this.logger.log(`Fazendo solicatacao para API`);
    return this.ordersRepository.requestCashbackByCpf(cpfFormated);
  }
}
