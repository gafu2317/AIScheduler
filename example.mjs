import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();//.envの内容を読み込む

const apiKey = process.env.CHATGPT_KEY;

const openai = new OpenAI({ apiKey: apiKey});

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: "Write a haiku about recursion in programming.",
    },
  ],
});

console.log(completion.choices[0].message);
