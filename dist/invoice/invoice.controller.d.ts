import { InvoiceService } from "./invoice.service";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
export declare class InvoiceController {
    private invoiceService;
    constructor(invoiceService: InvoiceService);
    findAll(): Promise<any>;
    bulkUpload(createTaskDto: CreateTaskDto): Promise<TaskResponseDto>;
    uploadFile(file: any): Promise<any>;
}
