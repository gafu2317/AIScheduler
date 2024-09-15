import OpenAI from "openai";
import dotenv from "dotenv";
import { date } from "zod";

dotenv.config(); //.envの内容を読み込む

const apiKey = process.env.CHATGPT_KEY;
const client = new OpenAI({ apiKey: apiKey });

const dataSchema ={
   "type" : "object" ,
   "properties" : {
     taskdate : {
        "type" : "date"
     },
     title : { 
        "type" : "string" 
     },
     discription : {
        "type" : "string"
     },
     taskdeadline : {
        "type" : "date"
     }
     predictTaskTime : {

     }
    } 

}
  