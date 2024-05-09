import dotenv from "dotenv"
import readline from 'readline';
dotenv.config();
import * as fs from "fs"
import fetch from 'node-fetch'; 
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI=new GoogleGenerativeAI(process.env.API_KEY);

const rl =readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

async function start(){
    const model=genAI.getGenerativeModel({model:"gemini-pro"});

    const chat=model.startChat({
        // starting with 0 saved history
        history:[],
        generationConfig:{
            maxOutputTokens:500,
        },
    });

    async function askAndRespond(){
        rl.question("Dev Sanghvi:",async (msg)=>{
            if(msg.toLowerCase()==="exit"){
                rl.close();
            }else{
                try{
                const result=await chat.sendMessage(msg);
                const response=await result.response;
                const text=await response.text();

                console.log("Dev's Gemini:",text);
                askAndRespond();
                }catch(error){
                    console.log("Error:",error);
                }


            }
        })
    }
    askAndRespond();
}

start()