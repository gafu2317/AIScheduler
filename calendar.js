import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid"; // dayGrid プラグイン
import timeGridPlugin from "@fullcalendar/timegrid"; // timeGrid プラグイン
import { db, auth, provider } from "./fire.js";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  addDoc,
  getFirestore,
  // createCollectionAndAddDocument,
} from "firebase/firestore";
document.addEventListener("DOMContentLoaded", function () {
  var calendarMonthEl = document.getElementById("calendar-month");
  var calendarDayEl = document.getElementById("calendar-day");

  const modal = document.getElementById("event-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalStart = document.getElementById("modal-start");
  const modalEnd = document.getElementById("modal-end");
  const modalClose = document.getElementById("modal-close");

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

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
    eventClick: function (info) {
      modal.style.display = "block";
      modalTitle.textContent = info.event.title;
      modalStart.textContent = `開始: ${info.event.start.toLocaleString()}`;
      modalEnd.textContent = info.event.end
        ? `終了: ${info.event.end.toLocaleString()}`
        : "終了: なし";
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
    eventClick: function (info) {
      modal.style.display = "block";
      modalTitle.textContent = info.event.title;
      modalStart.textContent = `開始: ${info.event.start.toLocaleString()}`;
      modalEnd.textContent = info.event.end
        ? `終了: ${info.event.end.toLocaleString()}`
        : "終了: なし";
    },
  });

  calendarMonth.render();
  calendarDay.render();

  // ログイン処理
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (result.user != null) {
          const userId = result.user.uid;
          console.log(result.user.uid);

          // Firestoreからユーザーの予定を取得
          const q = query(collection(db, userId));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();

            // イベントをカレンダーに追加
            calendarMonth.addEvent({
              id: doc.id,
              title: data.title,
              start: data.start.toDate(), // Firestore Timestamp -> JS Dateに変換
              end: data.end.toDate(),
              allDay: data.allDay,
              backgroundColor: data.backgroundColor,
            });
            calendarDay.addEvent({
              id: doc.id,
              title: data.title,
              start: data.start.toDate(), // Firestore Timestamp -> JS Dateに変換
              end: data.end.toDate(),
              allDay: data.allDay,
              backgroundColor: data.backgroundColor,
            });
            console.log(doc.id, " => ", doc.data());
          });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  });
  // ユーザーのログアウト
  document
    .getElementById("sign-out-button")
    .addEventListener("click", async () => {
      signOut(auth)
        .then(() => {
          // サインアウト成功
          console.log("User signed out successfully");
        })
        .catch((error) => {
          // エラー処理
          console.error("Error during sign-out:", error);
        });
    });
});
