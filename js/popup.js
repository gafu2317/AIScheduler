const clickBtn = document.getElementById('clickBtn');
const popupWrapper = document.getElementById('popupWrapper');
const close = document.getElementById('close');
const Button = document.getElementById('Button');
const taskTitle = document.getElementById('taskTitle')
const taskDiscripition = document.getElementById('taskDiscription')
const taskTime = document.getElementById('taskTime')
const taskDate = document.getElementById('taskDate')
const taskColor = document.getElementById('taskColor');
const colorPopupWrapper = document.getElementById('colorPopupWrapper');
const colorClose = document.getElementById('colorClose');
const colorPopupInside = document.getElementById('colorPopupInside')
const circles = document.getElementsByClassName('circles');



// ボタンをクリックしたときにポップアップを表示させる
clickBtn.addEventListener('click', () => {
  popupWrapper.style.display = "block";
});

// タスクの色をクリックしたときにポップアップを表示させる
taskColor.addEventListener('click',() => {
  colorPopupWrapper.style.visibility = 'visible';
  colorPopupWrapper.style.display = 'block';
  
});

// ポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
popupWrapper.addEventListener('click', e => {
  if (e.target.id === popupWrapper.id || e.target.id === close.id) {
    popupWrapper.style.display = 'none';
    
  }
});

// タスクの色のポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
taskColor.addEventListener('click',function(e){
  if(e.target.id === colorPopupWrapper.id  || e.target.id === colorClose.id){
    colorPopupWrapper.style.visibility = 'hidden';
  }
});

// １０色の色のdivタグをクリックしたときに色を変更する
document.querySelectorAll('.circles').forEach(circles => {
  circles.addEventListener('click', () => {
    taskColor.style.backgroundColor = circles.dataset.color;
  });
});






const scheduleVariable = function(){
  const today =  new Date()
  const taskInput ={
    year : today.getFullYear(),
    month : today.getMonth()+1,
    day: today.getDay(),
    title: taskTitle.value,
  
    deadline:{
     year:taskDate.getFullYear(),
     month:taskDate.getMonth()+1,
     day:taskDate.getDay(),
    },
    taskDuration:taskTime.value,
    }
    console.log(taskInput)
 
  
}
//テストコード
/*Button.addEventListener('click', () => {
  alert(`タイトル: ${taskTitle.value}\n詳細: ${taskDiscription.value}\n時間: ${taskTime.value}\n日付: ${taskDate.value}`); 
});*/

export default scheduleVariable;