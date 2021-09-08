import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type InvoiceDocument = Invoice & mongoose.Document;
@Schema()
export class Invoice {
  @Prop()
  amount: number;

  @Prop()
  selling_amount: number;

  @Prop()
  Date: Date;

  @Prop()
  status: string;

  @Prop({default:Date.now})
  created_at: Date;
}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);