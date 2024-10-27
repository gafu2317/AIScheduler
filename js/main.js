import scheduleVariable from "./popup.js";
const Button = document.getElementById("Button");



Button.addEventListener("click", async() => {
  // const taskInput = scheduleVariable();
  // console.log(taskInput);
  try {
    const response = await fetch("http://localhost:3000/predictTaskTime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskInput: taskInput,
        OtherSchedule: otherSchedule,
      }),
    });
    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`エラー：${response.status} ${response.statusText}\n${errorDetail}`);
    }
    const result = await response.json();
    console.log(result);  
  } catch (error) {
    console.error(error);
  }
});

//テスト用データ
const taskInput = {
  year: 2024,
  month: 9,
  day: 14,
  title: "新しいプロジェクトの計画",
  description: "プロジェクトの初期計画を立てる。",
  taskDuration: 120,
  deadline: {
    year: 2024,
    month: 10,
    day: 15,
  },
};

const otherSchedule = {
  schedule: [
    {
      year: 2024,
      month: 9,
      day: 14,
      startTime: 600,
      endTime: 660,
    },
    {
      year: 2024,
      month: 9,
      day: 15,
      startTime: 720,
      endTime: 780,
    },
  ],
};