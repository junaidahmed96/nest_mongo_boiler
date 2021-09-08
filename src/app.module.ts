import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/invoiceData'),InvoiceModule],

})
export class AppModule {}
