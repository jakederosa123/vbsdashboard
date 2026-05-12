import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

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

let app = null;
let db = null;

if (FIREBASE_SYNC_ENABLED) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { db };

const DASHBOARD_DOC_PATH = ["dashboards", "vbsdashboard"];

function getDashboardRef() {
  if (!FIREBASE_SYNC_ENABLED || !db) return null;
  return doc(db, ...DASHBOARD_DOC_PATH);
}

export async function loadDashboardData() {
  const ref = getDashboardRef();
  if (!ref) return null;

  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  return snap.data();
}

export async function saveDashboardData(data) {
  const ref = getDashboardRef();
  if (!ref) return;

  // Important: this is NOT merge:true.
  // It replaces the saved dashboard document, so deleted rows do not come back.
  await setDoc(ref, {
    registrations: data.registrations || [],
    volunteers: data.volunteers || [],
    rooms: data.rooms || [],
    schedule: data.schedule || [],
    planningNotes: data.planningNotes || "",
    updatedAt: serverTimestamp(),
  });
}
