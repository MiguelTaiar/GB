import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRequest } from './interfaces/order.interface';
import { Order, orderDocument } from './Schemas/order.schema';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<orderDocument>,
  ) {}

  private readonly logger = new Logger(OrdersRepository.name);

  normalizeDataTypes(order: OrderRequest) {
    this.logger.log(`Normalizando dados para compra ${order.code}`);

    try {
      const date = new Date(order.date);
      const price = Number(order.price);

      if (isNaN(date.valueOf())) {
        throw new TypeError(
          `Formato invalido para data. Experado: YYYY-MM-DD Recebido: ${order.date}`,
        );
      } else if (isNaN(price.valueOf())) {
        throw new TypeError(`Formato invalido para price: ${order.price}`);
      }

      return {
        ...order,
        date,
        price,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, 400);
    }
  }

  async calculateCashbackPercentage(
    orderRequest: OrderRequest,
  ): Promise<number> {
    this.logger.log(
      `Calculando porcentagem de cashback para compra ${orderRequest.code}`,
    );

    const userOrders = await this.getOrders('cpf', orderRequest.cpf);
    // const userOrders = await this.orderModel
    //   .find({ cpf: orderRequest.cpf })
    //   .exec();

    const sameMonthOrders = this.getSameMonthOrders(
      userOrders,
      orderRequest.date,
    );

    const totalPeriodPrice = this.sumPeriodOrdersPrices(
      sameMonthOrders,
      orderRequest.price,
    );

    return this.getPercentage(totalPeriodPrice);
  }

  async getOrders(filterName: string, filter): Promise<Array<Order>> {
    const filterObj = {};
    filterObj[filterName] = filter;
    return this.orderModel.find(filterObj).exec();
  }

  getSameMonthOrders(
    userOrders: Array<OrderRequest>,
    orderDate: Date,
  ): Array<OrderRequest> {
    return userOrders.filter(
      (order) =>
        order.date.getMonth() === orderDate.getMonth() &&
        order.date.getFullYear() === orderDate.getFullYear(),
    );
  }

  sumPeriodOrdersPrices(
    sameMonthOrders: Array<OrderRequest>,
    orderPrice: number,
  ) {
    return (
      sameMonthOrders.reduce((accum, curr) => accum + curr.price, 0) +
      orderPrice
    );
  }

  getPercentage(totalPeriodPrice: number): number {
    if (totalPeriodPrice <= 1000) return 10;
    else if (totalPeriodPrice > 1000 && totalPeriodPrice <= 1500) return 15;
    else if (totalPeriodPrice > 1500) return 20;
  }

  checkOrderStatus(cpf: string): string {
    return cpf === '153.509.460-56' ? 'Aprovado' : 'Em validação';
  }
}
