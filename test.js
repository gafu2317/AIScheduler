import { db } from "./fire";
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
} from "firebase/firestore";

// ボタンクリック時のイベント処理
document.getElementById("addCityBtn").addEventListener("click", async () => {
  // データの追加
  const citiesRef = collection(db, "sakurasaku");

  try {
    // Firestoreにドキュメントを追加
    await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.",
      state: null,
      country: "USA",
      capital: true,
      population: 680000,
      regions: ["east_coast"],
    });

    // データの取得（１個）
    console.log("Document successfully written!");
    const docRef = doc(db, "sakurasaku", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    // データの取得（複数）
    const q = query(collection(db, "sakurasaku"), where("capital", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } catch (e) {
    console.error("Error writing document: ", e);
  }
});
