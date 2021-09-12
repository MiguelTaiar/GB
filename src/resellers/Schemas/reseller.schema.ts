import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type resellerDocument = Reseller & Document;

@Schema()
export class Reseller {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const resellerSchema = SchemaFactory.createForClass(Reseller);
