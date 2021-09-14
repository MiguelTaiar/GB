import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type orderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  cashbackPercent: number;

  @Prop({ required: true })
  cashbackAmount: number;

  @Prop({ required: true })
  status: string;
}

export const orderSchema = SchemaFactory.createForClass(Order);
