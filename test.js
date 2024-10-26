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

// Googleプロバイダオブジェクトのインスタンス構築
//const provider = new GoogleAuthProvider();

// 認証プロバイダにリクエストする追加の OAuth 2.0 スコープを指定
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

// Authオブジェクトでのユーザー取得
// const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});



// // ログイン処理
// const loginButton = document.getElementById("loginButton");
// loginButton.addEventListener("click", () => {
//   loginButton.disabled = true;

//   signInWithPopup(auth, provider)
//     .then(async (result) => {
//       if (result.user != null) {
//         userId = result.user.uid;
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
//     })
//     .finally(() => {
//       loginButton.disabled = false;
//     });
// });


// // pullBtnボタンクリック時のイベント処理
// document.getElementById("pullBtn").addEventListener("click", async () => {
//   const docRef = doc(db, "userid", "tasks20240925_174856");
//   const docSnap = await getDoc(docRef);

// //pull information from "docRef" of "userid"
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }
// // データの取得（複数）
// const q = query(collection(db, "userid"));
// //  where("month", "==", true));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });
// });

// // ユーザーのログアウト
// document
//   .getElementById("sign-out-button")
//   .addEventListener("click", async () => {
//     signOut(auth)
//       .then(() => {
//         // サインアウト成功
//         console.log("User signed out successfully");
//       })
//       .catch((error) => {
//         // エラー処理
//         console.error("Error during sign-out:", error);
//       });
//   });
