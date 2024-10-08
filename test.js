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
} from "firebase/auth";

// Googleプロバイダオブジェクトのインスタンス構築
//const provider = new GoogleAuthProvider();

// 認証プロバイダにリクエストする追加の OAuth 2.0 スコープを指定
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

// サインインボタンを押したときの動作
document
  .getElementById("sign-in-button")
  .addEventListener("click", async () => {
    //const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // Google Access Tokenの取得。Google APIにアクセスするために使用できる。
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // サインインしたユーザー情報
        const user = result.user;

        // その他のIDプロバイダ情報を取得
        const additionalUserInfo = getAdditionalUserInfo(result);
        console.log("Additional User Info:", additionalUserInfo);

        // ...
      })
      .catch((error) => {
        // エラー処理
        const errorCode = error.code;
        const errorMessage = error.message;

        // ユーザーのメールアドレス
        const email = error.customData.email;

        // 使用された認証情報のタイプ
        const credential = GoogleAuthProvider.credentialFromError(error);

        // エラーメッセージの表示
        console.error("Error during sign-in:", errorCode, errorMessage, email);
      });
  });

  // // ボタンクリック時のイベント処理
document.getElementById("addBtn").addEventListener("click", async () => {
  // データの追加
  const citiesRef = collection(db, "sakurasaku");
});

  //▼以下ドキュメント名の作成工程
  try {
    let now = new Date(); // 現在の日時を取得
    console.log(now); // 現在の日時を表示

    // 現在時刻をドキュメント名に使用するため、"YYYYMMDD_HHmmSS" の形式でフォーマット
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0"); // 月は0から始まるため +1
    let day = now.getDate().toString().padStart(2, "0");
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    // ドキュメント名を作成（例: "20240921_143045"）
    let docName = `${"tasks"}${year}${month}${day}_${hours}${minutes}${seconds}`;

    // Firestoreにドキュメントを追加
    await setDoc(doc(db, "userid", docName), {
      year: year.toString(),
      month: month,
      day: day,
      title: "",
      endTime: 1,
      startTime: now, // サブコレクションのドキュメントに日付を追加
      description: "",
    });

    console.log(`Document created with name: ${docName}`);

    // // 親コレクションと親ドキュメントの参照
    // let parentDocRef = doc(db, "userid", docName); // "userid" コレクションの新しいドキュメント

    console.log("Subcollection document added successfully!");
  } catch (error) {
    console.error("Error adding document or subcollection: ", error);
  }
// });

// pullBtnボタンクリック時のイベント処理
document.getElementById("pullBtn").addEventListener("click", async () => {
  const docRef = doc(db, "userid", "tasks20240925_174856");
  const docSnap = await getDoc(docRef);

//pull information from "docRef" of "userid"
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
// データの取得（複数）
const q = query(collection(db, "userid"));
//  where("month", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
});


// ユーザーのログアウト
document
  .getElementById("sign-out-button")
  .addEventListener("click", async () => {
    const auth = getAuth();

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
