"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModule = void 0;
const common_1 = require("@nestjs/common");
const invoice_controller_1 = require("./invoice.controller");
const invoice_service_1 = require("./invoice.service");
const invoice_schema_1 = require("./schema/invoice.schema");
const mongoose_1 = require("@nestjs/mongoose");
const nest_csv_parser_1 = require("nest-csv-parser");
let InvoiceModule = class InvoiceModule {
};
InvoiceModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: invoice_schema_1.Invoice.name, schema: invoice_schema_1.InvoiceSchema }]), nest_csv_parser_1.CsvModule],
        controllers: [invoice_controller_1.InvoiceController],
        providers: [invoice_service_1.InvoiceService]
    })
], InvoiceModule);
exports.InvoiceModule = InvoiceModule;
//# sourceMappingURL=invoice.module.js.map