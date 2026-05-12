import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzhnCPSAA0nVWNC0SWb6_vCIa5hYm9Kgk",
  authDomain: "vbsdash-43f18.firebaseapp.com",
  projectId: "vbsdash-43f18",
  storageBucket: "vbsdash-43f18.firebasestorage.app",
  messagingSenderId: "718569780585",
  appId: "1:718569780585:web:1939058bd7cd7e2751f9f8",
  measurementId: "G-ENK2M539Z8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const DASHBOARD_COLLECTION = "dashboards";
const DASHBOARD_DOC_ID = "main";

export const FIREBASE_SYNC_ENABLED = true;

export async function loadDashboardData() {
  const ref = doc(db, DASHBOARD_COLLECTION, DASHBOARD_DOC_ID);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function saveDashboardData(data) {
  const ref = doc(db, DASHBOARD_COLLECTION, DASHBOARD_DOC_ID);

  // IMPORTANT:
  // Do NOT use { merge: true } here.
  // This fully replaces the Firestore dashboard document.
  await setDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDashboardData() {
  const ref = doc(db, DASHBOARD_COLLECTION, DASHBOARD_DOC_ID);
  await deleteDoc(ref);
}