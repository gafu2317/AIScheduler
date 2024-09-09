import OpenAI from "openai";
import dotenv from "dotenv";
import z from "zod";
import { zodFunction } from "openai/helpers/zod";

dotenv.config(); //.envの内容を読み込む

// 入力スキーマの定義
const TaskInputSchema = z.object({
  title: z.string(), // タスクのタイトルは文字列
  description: z.string(), // タスクの詳細は文字列
});
// 出力スキーマの定義
const TaskOutputSchema = z.object({
  minutes: z.number().int(), // 予測された時間は整数
});

const apiKey = process.env.CHATGPT_KEY;
const client = new OpenAI({ apiKey: apiKey });

const predictTaskTime = async (taskInput) => {
  //入力データの検証
  TaskInputSchema.parse(taskInput);
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
    // tools: [
    //   zodFunction({
    //     name:"predictTaskTime",
    //     parameters: TaskInputSchema,
    //     result: TaskOutputSchema,
    //   }),
    // ],
  });

    console.log("APIレスポンス:", JSON.stringify(completion, null, 2));


  // // 出力データの検証
  // const result =
  //   completion.choices[0].message.tool_calls[0].function.parsed_arguments;
  // TaskOutputSchema.parse(result);

  // return result.minutes;
};

const taskInput = {
  title: "ドキュメントの作成",
  description:
    "プロジェクトの最終報告書を作成する。十ページ程度の文章を書く。,そこまで難しくない",
};

predictTaskTime(taskInput)
  // .then((minutes) => {
  //   console.log(`予測された時間: ${minutes} 分`);
  // })
  // .catch((error) => {
  //   console.error("エラーが発生しました:", error);
  // });
