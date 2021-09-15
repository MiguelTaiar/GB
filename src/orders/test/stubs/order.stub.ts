import { Order } from 'src/orders/Schemas/order.schema';

export const orderStub = (): Order => {
  return {
    cpf: '111.111.111-11',
    code: '123',
    price: 10.0,
    date: new Date(),
    cashbackPercent: 10,
    cashbackAmount: 10,
    status: 'Em Validação',
  };
};
