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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDzhnCPSAA0nVWNC0SWb6_vCIa5hYm9Kgk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vbsdash-43f18.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vbsdash-43f18",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vbsdash-43f18.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "718569780585",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:718569780585:web:1939058bd7cd7e2751f9f8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ENK2M539Z8",
};

const syncEnvValue = import.meta.env.VITE_FIREBASE_SYNC_ENABLED;
export const FIREBASE_SYNC_ENABLED = syncEnvValue === undefined ? true : syncEnvValue === "true";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const DASHBOARD_DOC_PATH = ["dashboards", "vbsdashboard"];

function dashboardRef() {
  return doc(db, ...DASHBOARD_DOC_PATH);
}

function cleanForFirestore(data) {
  return {
    registrations: Array.isArray(data?.registrations) ? data.registrations : [],
    volunteers: Array.isArray(data?.volunteers) ? data.volunteers : [],
    rooms: Array.isArray(data?.rooms) ? data.rooms : [],
    schedule: Array.isArray(data?.schedule) ? data.schedule : [],
    groups: Array.isArray(data?.groups) ? data.groups : [],
    stations: Array.isArray(data?.stations) ? data.stations : [],
    dailyShape: Array.isArray(data?.dailyShape) ? data.dailyShape : [],
    weekFlows: Array.isArray(data?.weekFlows) ? data.weekFlows : [],
    planningNotes: typeof data?.planningNotes === "string" ? data.planningNotes : "",
  };
}

export async function loadDashboardData() {
  if (!FIREBASE_SYNC_ENABLED) return null;
  const snap = await getDoc(dashboardRef());
  if (!snap.exists()) return null;
  return cleanForFirestore(snap.data());
}

export async function saveDashboardData(data) {
  if (!FIREBASE_SYNC_ENABLED) return;
  await setDoc(dashboardRef(), {
    ...cleanForFirestore(data),
    updatedAt: serverTimestamp(),
  });
}

export async function clearDashboardData() {
  if (!FIREBASE_SYNC_ENABLED) return;
  await setDoc(dashboardRef(), {
    registrations: [],
    volunteers: [],
    rooms: [],
    schedule: [],
    groups: [],
    stations: [],
    dailyShape: [],
    weekFlows: [],
    planningNotes: "",
    updatedAt: serverTimestamp(),
    clearedAt: serverTimestamp(),
  });
}

export async function deleteDashboardDocument() {
  if (!FIREBASE_SYNC_ENABLED) return;
  await deleteDoc(dashboardRef());
}
