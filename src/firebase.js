import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const FIREBASE_SYNC_ENABLED =
  import.meta.env.VITE_FIREBASE_SYNC_ENABLED === "true";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const DASHBOARD_DOC_PATH = ["dashboards", "vbsdashboard"];

export async function loadDashboardData() {
  if (!FIREBASE_SYNC_ENABLED) return null;

  const ref = doc(db, ...DASHBOARD_DOC_PATH);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data();
}

export async function saveDashboardData(data) {
  if (!FIREBASE_SYNC_ENABLED) return;

  const ref = doc(db, ...DASHBOARD_DOC_PATH);

  await setDoc(
    ref,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function listenToDashboardData(callback) {
  if (!FIREBASE_SYNC_ENABLED) return () => {};

  const ref = doc(db, ...DASHBOARD_DOC_PATH);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  });
}