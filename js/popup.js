const clickBtn = document.getElementById("clickBtn");
const popupWrapper = document.getElementById("popupWrapper");
const close = document.getElementById("close");
const Button = document.getElementById("Button");
const ButtonPopupWrapper = document.getElementById("ButtonPopupWrapper");
const ButtonClose = document.getElementById("ButtonClose");
const ButtonContainer = document.getElementById("ButtonContainer");
const taskTitle = document.getElementById("taskTitle");

const taskDiscription = document.getElementById("taskDiscription");
const taskTime = document.getElementById("taskTime");
const taskDate = document.getElementById("taskDate");
const taskColor = document.getElementById("taskColor");
const colorPopupWrapper = document.getElementById("colorPopupWrapper");
const colorClose = document.getElementById("colorClose");
const colorPopupInside = document.getElementById("colorPopupInside");
const circles = document.getElementsByClassName("circles");
const locationPopupWrapper = document.getElementById("locationPopupWrapper");
const taskLocation = document.getElementById("taskLocation");

// ボタンをクリックしたときにポップアップを表示させる
clickBtn.addEventListener("click", () => {
  popupWrapper.style.display = "block";
});

// タスクの色をクリックしたときにポップアップを表示させる
taskColor.addEventListener("click", () => {
  colorPopupWrapper.style.visibility = "visible";
  colorPopupWrapper.style.display = "block";
});

//　マップアイコンをクリックしたときにポップアップを表示させる
taskLocation.addEventListener("click", () => {
  locationPopupWrapper.style.visibility = "visible";
  locationPopupWrapper.style.display = "block";
});

//タスク追加ボタンを押したときにポップアップを表示させる
Button.addEventListener("click", () => {
  ButtonPopupWrapper.style.visibility = "visible";
  ButtonPopupWrapper.style.display = "block";
});

// ポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
popupWrapper.addEventListener("click", (e) => {
  if (e.target.id === popupWrapper.id || e.target.id === close.id) {
    popupWrapper.style.display = "none";
  }
});

// タスクの色のポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
taskColor.addEventListener("click", function (e) {
  if (e.target.id === colorPopupWrapper.id || e.target.id === colorClose.id) {
    colorPopupWrapper.style.visibility = "hidden";
  }
});

// マップのポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
taskLocation.addEventListener("click", function (e) {
  if (
    e.target.id === locationPopupWrapper.id ||
    e.target.id === locationClose.id
  ) {
    locationPopupWrapper.style.visibility = "hidden";
  }
});

//タスク追加確認画面のポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
ButtonContainer.addEventListener("click", function (e) {
  if (e.target.id === ButtonPopupWrapper.id || e.target.id === ButtonClose.id) {
    ButtonPopupWrapper.style.visibility = "hidden";
  }
});
// １０色の色のdivタグをクリックしたときに色を変更する
document.querySelectorAll(".circles").forEach((circles) => {
  circles.addEventListener("click", () => {
    taskColor.style.backgroundColor = circles.dataset.color;
  });
});

const scheduleVariable = function () {
  const today = new Date();
  const taskInputDate = new Date(taskDate.value);
  const taskInput = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    title: taskTitle.value,
    description: taskDiscription.value,
    deadline: {
      year: taskInputDate.getFullYear(),
      month: taskInputDate.getMonth() + 1,
      day: taskInputDate.getDate(),
    },
    taskDuration: taskTime.value,
  };
  return taskInput;
};

const taskInformations = function () {
  const informations = {
    taskColor: taskColor.style.backgroundColor,
    taskLocation: document.getElementById("location").value
  };

  return informations;
};

//テストコード
/*Button.addEventListener('click', () => {
  alert(`タイトル: ${taskTitle.value}\n詳細: ${taskDiscription.value}\n時間: ${taskTime.value}\n日付: ${taskDate.value}`); 
});*/

export { scheduleVariable, taskInformations };
