import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid"; // dayGrid プラグイン
import timeGridPlugin from "@fullcalendar/timegrid"; // timeGrid プラグイン

document.addEventListener("DOMContentLoaded", function () {
  var calendarMonthEl = document.getElementById("calendar-month");
  var calendarDayEl = document.getElementById("calendar-day");

  // 月表示のカレンダー
  var calendarMonth = new Calendar(calendarMonthEl, {
    plugins: [dayGridPlugin],
    initialView: "dayGridMonth",
    events: [
      { title: "イベント1", start: "2024-09-10" },
      { title: "イベント2", start: "2024-09-12" },
    ],
    // カレンダー間の同期を取る場合、dateClickを使う
    dateClick: function (info) {
      calendarDay.gotoDate(info.dateStr);
    },
  });

  // 日表示のカレンダー
  var calendarDay = new Calendar(calendarDayEl, {
    plugins: [timeGridPlugin],
    initialView: "timeGridDay",
    allDaySlot: false, // 終日スロットを非表示
    //height: "auto", // 高さを自動調整
    events: [
      { title: "イベント1", start: "2024-09-10T09:00:00" },
      { title: "イベント2", start: "2024-09-12T13:00:00" },
    ],
  });

  calendarMonth.render();
  calendarDay.render();
});
