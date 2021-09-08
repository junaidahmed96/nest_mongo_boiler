import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceSchema,Invoice } from "./schema/invoice.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { CsvModule } from 'nest-csv-parser'



@Module({
  imports:[MongooseModule.forFeature([{name:Invoice.name,schema:InvoiceSchema}]),CsvModule],
  controllers:[ InvoiceController],
  providers: [InvoiceService]
})
export class InvoiceModule {}
