import { Document } from "mongoose";

export interface Invoice extends Document{

readonly amount:number;
readonly selling_amount:number;
readonly Date:number;


}