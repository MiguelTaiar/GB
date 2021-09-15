import { Test } from '@nestjs/testing';
import { orderStub } from './stubs/order.stub';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { Order } from '../Schemas/order.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

jest.mock('../orders.service');

describe('OrdersRepository', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtAuthGuard],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    ordersController = moduleRef.get<OrdersController>(OrdersController);
    ordersService = moduleRef.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  describe('getOrders', () => {
    describe('when getOrders is called', () => {
      let order: Array<Order>;

      beforeEach(async () => {
        order = await ordersController.getOrders(orderStub().cpf);
      });

      it('then it should call ordersService', () => {
        expect(ordersService.getOrderByCpf).toBeCalledWith(orderStub().cpf);
      });
    });
  });
});
