//import predictTaskTime from "./ScheduleTask.js";
import scheduleVariable from "./popup.js";
const Button = document.getElementById('Button')


Button.addEventListener('click', () => {
    const taskInput = scheduleVariable(); 
    console.log(taskInput);
  });

  // popupContainerにポップアップのHTMLを挿入
  document.getElementById("popupContainer").innerHTML = colorInput;

  // ポップアップ表示用のスタイルを設定
 // document.getElementById("popupContainer").style.display = 'block';