import { InvoiceDocument } from './schema/invoice.schema';
import { Model } from 'mongoose';
import { CsvParser } from 'nest-csv-parser';
export declare class InvoiceService {
    private readonly csvParser;
    private taskModel;
    constructor(csvParser: CsvParser, taskModel: Model<InvoiceDocument>);
    findAll(): Promise<any>;
    bulkUpload(file: any): Promise<any>;
}
