const clickBtn = document.getElementById('clickBtn');
const popupWrapper = document.getElementById('popupWrapper');
const close = document.getElementById('close');
const Button = document.getElementById('Button');
const taskColor = document.getElementById('taskColor');
const colorPopupWrapper = document.getElementById('colorPopupWrapper');
const colorClose = document.getElementById('colorClose');


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

//入力された値を読み込む関数(テスト用)
Button.addEventListener('click',function(){
  const inputValue = document.getElementById('tasktitle').value;
  alert(inputValue);
});



