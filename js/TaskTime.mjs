import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); //.envの内容を読み込む

const apiKey = process.env.CHATGPT_KEY;
const client = new OpenAI({ apiKey: apiKey });

// JSONスキーマ
// const taskInputSchema ={
//   type : "object",
//   properties : {
//     title : {
//       type : "string"
//     },
//     description : {
//       type : "string"
//     }
//   },
//   required : ["title","description"],
//   additionalProperties : false
// }
const taskOutputSchema ={
  type : "object",
  properties : {
    minutes : {
      type : "number"
    }
  },
  required : ["minutes"],
  additionalProperties : false
}

const predictTaskTime = async (taskInput) => {
  //OpenAI APIの呼び出し
  const completion = await client.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. You help users estimate the time required for tasks based on the task details.",
      },
      {
        role: "user",
        content: `Predict how long it will take to complete the following task: ${taskInput.title}. ${taskInput.description}`,
      },
    ],
    response_format:{
      type : "json_schema",
      json_schema : {
        name : "taskOutput",
        strict : true,
        schema : taskOutputSchema
      }
    } 
  });

  console.log(completion.choices[0].message.parsed);

};

const taskInput = {
  title: "ドキュメントの作成",
  description:
    "プロジェクトの最終報告書を作成する。十ページ程度の文章を書く。,そこまで難しくない",
};


