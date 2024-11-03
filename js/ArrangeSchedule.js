import testResult from "./main";
const ButtonPopupResult= document.getElementById('ButtonPopupResult');
console.log(testResult);
// const jsonString = JSON.stringify(testResult);
function displayData(data){
    ButtonPopupResult.innerHTML = setInnerHTML(data); 
}
function setInnerHTML(data){
  const HTMLcontent =`<div></div>`;
  for(let i=0;i<data.length;i++){
    HTMLcontent+=`
      <div id="title">タスク${(i+1)}</div>
      <div id="dateContainer">
        <div id="year">${i}</div>
        <div id="month"></div>
        <div id="day"></div>
      </div>
      <div id="timeContainer">
        <div id="startTime"></div>
        <div id="endTime"></div>
      </div>
      `
  }
  return HTMLcontent; 
};
displayData(testResult);