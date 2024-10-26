import { db, auth, provider } from "./fire.js";
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
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// // ログイン処理
// const loginButton = document.getElementById("loginButton");
// loginButton.addEventListener("click", () => {
//   signInWithPopup(auth, provider)
//     .then(async (result) => {
//       if (result.user != null) {
//         const userId = result.user.uid;
//         console.log(result.user.uid);

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
// });
