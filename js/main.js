import { scheduleVariable, taskInformations } from "./popup.js";
const Button = document.getElementById("Button");

Button.addEventListener("click", async () => {
 /* const taskInput = scheduleVariable();
  console.log(taskInput);
  const taskInfo = taskInformations(); 
  console.log(taskInfo); */
  // try {
  //   const response = await fetch("http://localhost:3000/predictTaskTime", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       taskInput: taskInput,
  //       OtherSchedule: otherSchedule,
  //     }),
  //   });
  //   if (!response.ok) {
  //     const errorDetail = await response.text();
  //     throw new Error(
  //       `エラー：${response.status} ${response.statusText}\n${errorDetail}`
  //     );
  //   }
  //   const result = await response.json();
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  // }
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
//テスト用データ
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

// テスト用出力データ
const preTestResult = {
  tasks: [
    {
      year: 2024,
      month: 9,
      day: 14,
      StartMinutes: 660,
      TaskDuration: 60,
    },
    {
      year: 2024,
      month: 9,
      day: 14,
      StartMinutes: 780,
      TaskDuration: 60,
    },
  ],
};

// 各タスクに EndMinutes を追加する関数
function addEndMinutes(tasks) {

  tasks.forEach(task => {
    task.EndMinutes = task.StartMinutes + task.TaskDuration; // EndMinutes を計算
    delete task.TaskDuration; // TaskDuration を削除
  });
  return tasks; // 修正: タスクの配列を返す
}
// testResultを更新
const testResult = {
  tasks: addEndMinutes(preTestResult.tasks), // preTestResult.tasksを渡す
};

console.log(testResult);


export default testResult;