"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const invoice_schema_1 = require("./schema/invoice.schema");
const mongoose_2 = require("mongoose");
const path_1 = require("path");
const nest_csv_parser_1 = require("nest-csv-parser");
const fs_1 = require("fs");
class Entity {
}
let InvoiceService = class InvoiceService {
    constructor(csvParser, taskModel) {
        this.csvParser = csvParser;
        this.taskModel = taskModel;
    }
    async findAll() {
        return this.taskModel.find().exec();
    }
    async bulkUpload(file) {
        if (!file) {
            throw new common_1.NotFoundException("File Not Found");
        }
        else if (file.mimetype != 'text/csv') {
            throw new common_1.HttpException('Invalid File Type', 503);
        }
        let filename = path_1.join(process.cwd(), './' + file.path);
        let csv = fs_1.readFileSync(filename, { encoding: "utf-8" });
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i])
                continue;
            const obj = {};
            const currentline = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        await Promise.all(result.map(async (row, index) => {
            if (index > 0) {
                let data = { amount: (row.amount || '').toString(), date: (row.date || '').toString() };
                let date = new Date(data.date);
                if (!data.amount) {
                    let obj = {
                        Date: date,
                        status: "Amount required"
                    };
                    const createdCat = new this.taskModel(obj);
                    createdCat.save().then(r2 => {
                    });
                }
                if (!data.date) {
                    let obj = {
                        amount: data.amount,
                        status: "Date Required"
                    };
                    const createdCat = new this.taskModel(obj);
                    createdCat.save().then(r2 => {
                    });
                }
                if (data.date) {
                    let date = new Date(data.date);
                    let currentMillis = new Date().getTime();
                    let millisIn30Days = 30 * 24 * 60 * 60 * 1000;
                    console.log(date.getTime() < (currentMillis - millisIn30Days));
                    if (date.getTime() < (currentMillis - millisIn30Days)) {
                        let value = data.amount * 0.3;
                        let obj = {
                            selling_amount: value,
                            Date: date,
                            amount: data.amount,
                            status: "success"
                        };
                        const createdCat = new this.taskModel(obj);
                        createdCat.save().then(r2 => {
                        });
                    }
                    else {
                        let value = data.amount * 0.5;
                        console.log(value);
                        let obj = {
                            selling_amount: value,
                            Date: date,
                            amount: data.amount,
                            status: "success"
                        };
                        const createdCat = new this.taskModel(obj);
                        createdCat.save().then(r2 => {
                        });
                    }
                }
            }
        }));
        let obj = {
            message: "Success Added Your File",
            status: true
        };
        return obj;
    }
};
InvoiceService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel(invoice_schema_1.Invoice.name)),
    __metadata("design:paramtypes", [nest_csv_parser_1.CsvParser, mongoose_2.Model])
], InvoiceService);
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map