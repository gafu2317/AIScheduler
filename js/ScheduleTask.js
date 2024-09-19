import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); //.envの内容を読み込む

const apiKey = process.env.CHATGPT_KEY;
const client = new OpenAI({ apiKey: apiKey });

// JSONスキーマ
const taskOutputSchema = {
  type: "object",
  properties: {
   Setting:{
    type:"string",
    enum:["morning","afternoon"]
   },
    if:{
      properties:{
        Setting:{
          const:"morning"
        },
      },
    },
    then:{
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
      minimum:420,
  
    },
    EndMinutes: {
      type: "integer",
    },    
  },
  required: ["year", "month", "day", "StartMinutes", "EndMinutes","Setting"],
  additionalProperties: false,
},
if:{
  properties:{
    Setting:{
      const:"afternoon"
    },
  },
},  
  then:{
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
    minimum:780,

  },
  EndMinutes: {
    type: "integer",
  },    
  required: ["year", "month", "day", "StartMinutes", "EndMinutes","Setting"],
  additionalProperties: false,
  },
  
const predictTaskTime = async (taskInput) => {
  //OpenAI APIの呼び出し
  const completion = await client.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. ",
      },
      {
        role: "user",
        content: `Please allocate the task:${taskInput.title}, ${taskInput.description},  on days without any scheduled plans from today's date:${taskInput.year}/${taskInput.month}/${taskInput.day} to the deadline:${taskInput.deadline.year}/${taskInput.deadline.month}/${taskInput.deadline.day} . It is not necessary to complete it in a single day.`,
      },
    ],
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

const taskInput = {
  year: 2024,
  month: 9,
  day: 15,
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
    month: 10,
    day: 15,
  },
  taskDuration: 120, // 2時間
},

predictTaskTime(taskInput);
