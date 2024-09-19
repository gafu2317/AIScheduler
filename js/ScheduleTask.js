import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); //.envの内容を読み込む

const apiKey = process.env.CHATGPT_KEY;
const client = new OpenAI({ apiKey: apiKey });



//入力データの例を一時的に作成
const taskInput = {
  year: 2024,
  month: 9,
  day: 14,
  schedule: [
    {
      year: 2024,
      month: 9,
      day: 14,
      startTime: 600, // 10:00
      endTime: 660, // 11:00
    },
    {
      year: 2024,
      month: 9,
      day: 15,
      startTime: 720, // 12:00
      endTime: 780, // 13:00
    },
    // その他の予定が続く
  ],
  title: "新しいプロジェクトの計画",
  description: "プロジェクトの初期計画を立てる。",
  deadline: {
    year: 2024,
    month: 9,
    day: 15,
  },
  taskDuration: 720, 
};

//スケジュールがいくつあるか分からないので、map関数を使って文字列に変換
const scheduleString = taskInput.schedule
  .map((item) => {
    return `${item.year}/${item.month}/${item.day} ${item.startTime} - ${item.endTime}`;
  })
  .join(", ");

// JSONスキーマ
const taskOutputSchema = {
  type: "object",
  properties: {
    tasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          year: {
            type: "integer",
          },
          month: {
            type: "integer",
          },
          day: {
            type: "integer",
          },
          StartMinutes: {
            type: "integer",
          },
          TaskDuration: {
            type: "integer",
          },
        },
        required: ["year", "month", "day", "StartMinutes", "TaskDuration"],
        additionalProperties: false,
      },
    },
  },
  required: ["tasks"],
  additionalProperties: false,
};


const predictTaskTime = async (taskInput) => {
  //OpenAI APIの呼び出し
  const completion = await client.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Allocate the given task without overlapping with the existing schedule.",
      },
      {
        role: "user",
        content: `
        This task:${taskInput.title}, ${taskInput.description} is expected to take about ${taskInput.taskDuration} minutes. When should I start and how many minutes should I work? 
        If a task session is too long, please split it and create break times in between.
        Please ensure the total of TaskDuration is ${taskInput.taskDuration}.
        Ensure the task does not overlap with these scheduled plans :${scheduleString}.
        Please output the start time in minutes (e.g., for 12:00, output 720).
        this period is from today's date:${taskInput.year}/${taskInput.month}/${taskInput.day} to the deadline:${taskInput.deadline.year}/${taskInput.deadline.month}/${taskInput.deadline.day}.
        // `,
        //旧案
        // content: `
        //   This task:${taskInput.title}, ${taskInput.description} is expected to take about ${taskInput.taskDuration} minutes.
        //   Please allocate the task on days without any scheduled plans from today's date:${taskInput.year}/${taskInput.month}/${taskInput.day} to the deadline:${taskInput.deadline.year}/${taskInput.deadline.month}/${taskInput.deadline.day} .
        //   Ensure the task does not overlap with these scheduled plans :${scheduleString}.
        //   Please output the start time in minutes from midnight (e.g., for 12:00, output 720).
        //   Make sure to find time slots that are free.`,
      },
    ],
    //レスポンスの形式の指定
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "taskOutput",
        strict: true,
        schema: taskOutputSchema,
      },
    },
  });

  console.log(completion.choices[0].message.parsed);
};

predictTaskTime(taskInput);




