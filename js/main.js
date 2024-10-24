//import predictTaskTime from "./ScheduleTask.js";
import scheduleVariable from "./popup";
const Button = document.getElementById('Button')


Button.addEventListener('click', () => {
    const taskInput = scheduleVariable(); 
    console.log(taskInput);
  });

