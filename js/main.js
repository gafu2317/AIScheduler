//import predictTaskTime from "./ScheduleTask.js";
import {scheduleVariable,additionalOption} from "./popup.js";
const Button = document.getElementById('Button')


Button.addEventListener('click', () => {
    const taskInput = scheduleVariable(); 
    console.log(taskInput);
    const additionalTaskInput = additionalOption();
    console.log(additionalTaskInput);
  });

