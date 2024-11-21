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
      <div class="dateContainer">
        <div class="year">${data[i].year}年</div>
        <div class="month">${data[i].month}月</div>
        <div class="day">${data[i].day}日</div>
        <div class="startTime">${timeUnit(data[i].StartMinutes)}</div>
        <div class="endTime">${timeUnit(data[i].StartMinutes+data[i].TaskDuration)}</div>
      </div>
      `;
  }
  return HTMLcontent; 
};
displayData(testResult);