import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); //.envの内容を読み込む

const apiKey = process.env.CHATGPT_KEY;
const client = new OpenAI({ apiKey: apiKey });

const app = express();
const port = 3000;

app.use(cors()); // CORSを有効にする
app.use(express.json());

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
          EndMinutes: {
            type: "integer",
          },
        },
        required: ["year", "month", "day", "StartMinutes", "EndMinutes"],
        additionalProperties: false,
      },
    },
  },
  required: ["tasks"],
  additionalProperties: false,
};

const predictTaskTime = async (taskInput, OtherSchedule) => {
  //スケジュールがいくつあるか分からないので、map関数を使って文字列に変換
  const scheduleString = OtherSchedule.schedule
    .map((item) => {
      return `${item.year}/${item.month}/${item.day} ${item.startTime} - ${item.endTime}`;
    })
    .join(", ");

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
        content:
        `This task:${taskInput.title}, ${taskInput.description} is expected to take about ${taskInput.taskDuration} minutes. When should I start and how many minutes should I work?
        Do not schedule tasks between 0 mimutes and ${taskInput.noTaskUntilHour}mimutes. 
        If a ${taskInput.taskDuration} minutes is more than 240 minutes, please split it and create break times in between.
        Please ensure the total of TaskDuration is ${taskInput.taskDuration}.
        Ensure the task does not overlap with these scheduled plans :${scheduleString}.
        Please output the start time in minutes (e.g., for 12:00, output 720).
        this period is from today's date:${taskInput.year}/${taskInput.month}/${taskInput.day} to the deadline:${taskInput.deadline.year}/${taskInput.deadline.month}/${taskInput.deadline.day}.`,
        //旧案
        // content: `
        //   This task:${taskInput.title}, ${taskInput.description} is expected to take about ${taskInput.taskDuration} minutes.
        //   Please allocate the task on days without any scheduled plans from today's date:${taskInput.year}/${taskInput.month}/${taskInput.day} to the deadline:${taskInput.deadline.year}/${taskInput.deadline.month}/${taskInput.deadline.day} .
        //   Ensure the task does not overlap with these scheduled plans :${scheduleString}.
        //   Please output the start time in minutes from midnight (e.g., for 12:00, output 720).
        //   Make sure to find time slots that are free.`,
      },
    ],
    // レスポンスの形式の指定
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "taskOutput",
        strict: true,
        schema: taskOutputSchema,
      },
    },
  });
  console.log("AIの回答");  
  console.log(completion.choices[0].message.parsed);
  return completion.choices[0].message.parsed;
};



app.post("/predictTaskTime", async (req, res) => {
  const taskInput = req.body.taskInput;
  const OtherSchedule = req.body.OtherSchedule;
  try {
    const result = await predictTaskTime(taskInput, OtherSchedule);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

app.listen(port, () => {
  console.log(`サーバーが起動しました! http://localhost:${port}`);
});

