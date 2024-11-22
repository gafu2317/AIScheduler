import testResult from "./main";
const ButtonPopupResult= document.getElementById('ButtonPopupResult');
console.log(testResult);
// const jsonString = JSON.stringify(testResult);
function displayData(data){
    ButtonPopupResult.innerHTML = setInnerHTML(data); 
}
function timeUnit(totalminutes){
  const hours = Math.floor(totalminutes / 60);
  const minutes = totalminutes % 60;
  return hours + "時間" + minutes + "分";
}

function setInnerHTML(task){
    const data = task.tasks
  let HTMLcontent =`<div></div>`;
  for(let i=0;i<data.length;i++){
    HTMLcontent += `
      <div class="title">タスク${i + 1}回目</div>
      
      <div class="dateTimeContainer">
        <div class="dateContainer">
          <div class="arrangeContainer">
            <button id="task${i+1}upButton">▲</button>
            <div class="taskChild" id="task${i+1}year">${data[i].year}年</div>
            <button id="task${i+1}downButton">▼</button>
          </div>
          <div class="arrangeContainer">
            <button id="task${i+1}upButton">▲</button>
            <div class="taskChild" id="task${i+1}month">${data[i].month}月</div>
            <button id="task${i+1}downButton">▼</button>
          </div>
          <div class="arrangeContainer">
            <button id="task${i+1}upButton">▲</button>
            <div class="taskChild" id="task${i+1}day">${data[i].day}日</div>
            <button id="task${i+1}downButton">▼</button>
          </div>
        </div>
        <div class="timeContainer">
          <div class="arrangeContainer">
            <button id="task${i+1}upButton">▲</button>
            <div class="taskChild" id="task${i+1}startTime">${timeUnit(data[i].StartMinutes)}  </div>
            <button id="task${i+1}downButton">▼</button>
          </div>
          <div class="kara">〜</div>
          <div class="arrangeContainer">
            <button id="task${i+1}upButton">▲</button>
            <div class="taskChild" id="task${i+1}endTime">${timeUnit(
              data[i].StartMinutes + data[i].TaskDuration
            )}</div>
            <button id="task${i+1}downButton">▼</button>
          </div>
        </div>
      </div>
      `;
  }
  return HTMLcontent; 
};
displayData(testResult);