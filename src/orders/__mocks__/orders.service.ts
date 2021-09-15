import { orderStub } from 'test/stubs/order.stub';

export const OrdersService = jest.fn().mockReturnValue({
  processOrder: jest.fn().mockReturnValue(orderStub()),
  getOrderByCpf: jest.fn().mockReturnValue([orderStub()]),
  getCashbackAmount: jest.fn().mockReturnValue(100),
});
