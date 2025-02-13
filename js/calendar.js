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
let userId;
var calendarMonthEl = document.getElementById("calendar-month");
var calendarDayEl = document.getElementById("calendar-day");

const modal = document.getElementById("event-modal");
const modalTitle = document.getElementById("modal-title");
const modalStart = document.getElementById("modal-start");
const modalEnd = document.getElementById("modal-end");
const modalClose = document.getElementById("modal-close");
console.log("ok");
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
document.addEventListener("DOMContentLoaded", function () {
  calendarMonth.render();
  calendarDay.render();
  const loginButton = document.getElementById("loginButton");
  const userNameElement = document.getElementById("userName");
  // ユーザーのログイン状態を監視（ページリロード後も `uid` を維持）
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // ユーザーがログインしている場合
      const userId = user.uid;
      localStorage.setItem("firebaseUid", userId); // `uid` を `localStorage` に保存
      userNameElement.textContent = user.displayName;

      console.log("ユーザー認証済み:", userId);
      await fetchGoogleCalendarEvents();
      // Firestoreからユーザーの予定を取得
      const q = query(collection(db, userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        calendarMonth.addEvent({
          id: doc.id,
          title: data.title,
          start: data.start.toDate(),
          end: data.end.toDate(),
          allDay: data.allDay,
          backgroundColor: data.backgroundColor,
        });
        calendarDay.addEvent({
          id: doc.id,
          title: data.title,
          start: data.start.toDate(),
          end: data.end.toDate(),
          allDay: data.allDay,
          backgroundColor: data.backgroundColor,
        });
      });
    } else {
      // ログインしていない場合
      console.log("ユーザー未認証");
      localStorage.removeItem("firebaseUid"); // ログアウト時に `uid` を削除
      userNameElement.textContent = "ログインしてください";
    }
  });

  // ログイン処理
  loginButton.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const userId = result.user.uid;
        const token = result._tokenResponse.oauthAccessToken;

        localStorage.setItem("firebaseUid", userId); // ログイン後も `uid` を保存
        //localStorage.setItem("googleToken", token); // Google API トークンを保存
        window.location.href = "http://localhost:3000/auth";
        console.log("ログイン成功:", userId);
      }
    } catch (error) {
      console.error("ログインエラー:", error);
    }
    // loginButton.addEventListener("click", () => {
    //   signInWithPopup(auth, provider)
    //     .then(async (result) => {
    //       if (result.user != null) {
    //         userId = result.user.uid;
    //         console.log(result.user.uid);
    //         userNameElement.textContent = result.user.displayName;
    //         const token = result._tokenResponse.oauthAccessToken;
    //         console.log("Google API トークン:", token);

    //         localStorage.setItem("googleToken", token);
    //         // Firestoreからユーザーの予定を取得
    //         const q = query(collection(db, userId));

    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //           // doc.data() is never undefined for query doc snapshots
    //           const data = doc.data();

    //           // イベントをカレンダーに追加
    //           calendarMonth.addEvent({
    //             id: doc.id,
    //             title: data.title,
    //             start: data.start.toDate(), // Firestore Timestamp -> JS Dateに変換
    //             end: data.end.toDate(),
    //             allDay: data.allDay,
    //             backgroundColor: data.backgroundColor,
    //           });
    //           calendarDay.addEvent({
    //             id: doc.id,
    //             title: data.title,
    //             start: data.start.toDate(), // Firestore Timestamp -> JS Dateに変換
    //             end: data.end.toDate(),
    //             allDay: data.allDay,
    //             backgroundColor: data.backgroundColor,
    //           });
    //           console.log(doc.id, " => ", doc.data());
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Login error:", error);
    //     });
  });
  // ユーザーのログアウト
  document
    .getElementById("sign-out-button")
    .addEventListener("click", async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("firebaseUid"); // ✅ `uid` を削除
        localStorage.removeItem("googleToken"); // ✅ Google API トークンも削除
        console.log("✅ ログアウトしました");
        window.location.reload(); // ページをリロード
      } catch (error) {
        console.error("❌ ログアウトエラー:", error);
      }
    });
});
// 🔹 Google OAuth のトークンを取得
async function fetchGoogleToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const googleToken = urlParams.get("token");

  if (googleToken) {
    localStorage.setItem("googleToken", googleToken);
    console.log("✅ Google カレンダー API トークン取得:", googleToken);
  }
}

// 🔹 ページロード時に Google トークンを取得
window.onload = fetchGoogleToken;

export function addEventToCalendar(taskData) {
  taskData.tasks.forEach((task, index) => {
    const eventId = `testEvent-${index}`;
    const startDate = new Date(task.date);
    const endDate = new Date(task.endDate);

    calendarMonth.addEvent({
      id: eventId,
      title: taskData.title,
      start: startDate,
      end: endDate,
      allDay: task.isAllDay,
      backgroundColor: taskData.color || "blue",
    });

    calendarDay.addEvent({
      id: eventId,
      title: taskData.title,
      start: startDate,
      end: endDate,
      allDay: task.isAllDay,
      backgroundColor: taskData.color || "blue",
    });
  });

  console.log("カレンダーにイベントを追加しました:", taskData);
}
export async function addEventsToFirestore(eventData) {
  const userId = localStorage.getItem("firebaseUid"); // ✅ ローカルストレージから取得

  if (!userId) {
    console.error(
      "❌ Firestore にイベントを追加できません。ユーザーが未認証です。"
    );
    return;
  }
  console.log(eventData.tasks);
  try {
    const userCollection = collection(db, userId); // Firestoreのユーザーデータを参照

    for (const task of eventData.tasks) {
      console.log(task);
      await addDoc(userCollection, {
        title: eventData.title,
        description: eventData.description,
        start: task.date, // そのままDate型で保存
        end: task.endDate, // FirestoreのTimestampとして保存
        allDay: task.isAllDay,
        backgroundColor: eventData.color || "blue",
        // createdAt: new Date(),
      });
    }

    console.log("Firestoreにイベントを追加しました:", eventData);
  } catch (error) {
    console.error("Firestoreにイベントを追加中にエラーが発生:", error);
  }
}
// 🔹 Google カレンダーの予定を取得してレンダーに追加
async function fetchGoogleCalendarEvents() {
  const googleToken = localStorage.getItem("googleToken");

  if (!googleToken) {
    console.error("❌ Google トークンがありません。再ログインが必要です。");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/getGoogleCalendarEvents",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      }
    );

    const data = await response.json();
    if (data.events) {
      console.log("✅ Google カレンダーの予定取得:", data.events);
      data.events.forEach((event) => {
        calendarMonth.addEvent({
          id: event.id,
          title: event.summary,
          start: new Date(event.start.dateTime || event.start.date), // Google カレンダーの日付
          end: new Date(event.end.dateTime || event.end.date),
          allDay: !!event.start.date, // 終日イベントなら true
          backgroundColor: "#4285F4", // Google カレンダーの青色
        });
        calendarDay.addEvent({
          id: event.id,
          title: event.summary,
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
          allDay: !!event.start.date,
          backgroundColor: "#4285F4",
        });
      });
    }
  } catch (error) {
    console.error("❌ Google カレンダーの予定取得エラー:", error);
  }
}
