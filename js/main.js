//import predictTaskTime from "./ScheduleTask.js";
import scheduleVariable from "./popup.js";
const Button = document.getElementById('Button')


Button.addEventListener('click', () => {
    const taskInput = scheduleVariable(); 
    console.log(taskInput);
  });

