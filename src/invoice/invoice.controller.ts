import { Controller ,Get, Post,Body,UseInterceptors,UploadedFile} from '@nestjs/common';
import {InvoiceService  } from "./invoice.service";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('invoice')
export class InvoiceController {

    constructor(private invoiceService:InvoiceService){}

    @Get()
    async findAll(){
        return  this.invoiceService.findAll();
    }

  

@Post('upload')
@UseInterceptors(FileInterceptor("file",{
  dest:"./uploads"
}))
uploadFile(@UploadedFile() file) {
  // console.log(file);
  return this.invoiceService.bulkUpload(file);
  
}

}
