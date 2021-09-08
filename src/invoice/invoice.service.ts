import { Injectable ,NotFoundException,HttpException,StreamableFile} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice, InvoiceDocument } from './schema/invoice.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { join } from 'path';
import { CsvParser } from 'nest-csv-parser'



import { createReadStream, readFileSync } from 'fs';
// import { CSV } from "csvtojson";
class Entity {
    product_barcode: string
    product: string
  }
@Injectable()
export class InvoiceService {
    constructor(private readonly csvParser: CsvParser,@InjectModel(Invoice.name) private taskModel: Model<InvoiceDocument>,) {}
    
    async findAll(): Promise<any> {
        return this.taskModel.find().exec();
      }

    async bulkUpload(file): Promise<any>{
      
     if(!file){
      throw new  NotFoundException("File Not Found")
     }else if(file.mimetype != 'text/csv'){
      throw new HttpException('Invalid File Type',503);

     }
  
     
     let filename=join(process.cwd(),'./'+file.path)

     // Reading the file using default
// fs npm package

let csv = readFileSync(filename,{encoding:"utf-8"})
    
     

    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].split(',')

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
      }
    await Promise.all(
        result.map(async  (row, index) => {
        if(index > 0){
        // console.log(row,'dsdasda');
        
          let data = { amount: (row.amount || '').toString() , date: (row.date || '').toString()}
          let date=new Date(data.date)



        if (!data.amount) {
            let obj={
                
                  Date:date,
                  status:"Amount required"
              }


              const createdCat = new this.taskModel(obj);
               createdCat.save().then(r2=>{
                  
                   
               })
        //   return {error: true, message: 'Customer amount not enter', data: data}
        }

        if (!data.date) {
            let obj={
                
                
                amount:data.amount,
                status:"Date Required"
            }


            const createdCat = new this.taskModel(obj);
             createdCat.save().then(r2=>{
              
                 
             })
        }

        if(data.date){
            let date=new Date(data.date)
            
            
            let currentMillis = new Date().getTime();
            let millisIn30Days = 30 * 24 * 60 * 60 * 1000;
            console.log(date.getTime() < (currentMillis - millisIn30Days));

            if(date.getTime() < (currentMillis - millisIn30Days)){
              let value=  data.amount *0.3
              let obj={
                selling_amount:value,
                Date:date,
                  amount:data.amount,
                  status:"success"
              }


              const createdCat = new this.taskModel(obj);
               createdCat.save().then(r2=>{
                
                   
               })
                
            }else{

                let value=data.amount * 0.5
                console.log(value);
                let obj={
                    selling_amount:value,
                    Date:date,
                      amount:data.amount,
                      status:"success"
                  }
    
    
                  const createdCat = new this.taskModel(obj);
                   createdCat.save().then(r2=>{
                     
                       
                   })
                
            }


        }
        


        }

       })
    )
   let obj={
       message:"Success Added Your File",
       status:true
   }
   return obj
    
     
      }
}
