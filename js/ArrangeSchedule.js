import testResult from "./main";
const ButtonPopupResult= document.getElementById('ButtonPopupResult');
console.log(testResult);
// const jsonString = JSON.stringify(testResult);
function displayData(data){
    ButtonPopupResult.innerHTML = setInnerHTML(data); 
}
function timeUnit(minutes){
    
}
function setInnerHTML(task){
    const data = task.tasks
  let HTMLcontent =`<div></div>`;
  for(let i=0;i<data.length;i++){
    HTMLcontent+=`
      <div class="title">タスク${(i+1)}回目</div>
      <div class="dateContainer">
        <div class="year">${data[i].year}</div>
        <div class="month">${data[i].month}</div>
        <div class="day">${data[i].day}</div>
      </div>
      <div class="timeContainer">
        <div class="startTime">${data[i].}</div>
        <div class="endTime">${data[i].}</div>
      </div>
      `
  }
  return HTMLcontent; 
};
displayData(testResult);