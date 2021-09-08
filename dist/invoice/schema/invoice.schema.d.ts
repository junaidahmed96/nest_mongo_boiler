import * as mongoose from 'mongoose';
export declare type InvoiceDocument = Invoice & mongoose.Document;
export declare class Invoice {
    amount: number;
    selling_amount: number;
    Date: Date;
    status: string;
    created_at: Date;
}
export declare const InvoiceSchema: mongoose.Schema<mongoose.Document<Invoice, any, any>, mongoose.Model<mongoose.Document<Invoice, any, any>, any, any>, {}>;
