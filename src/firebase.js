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

export const FIREBASE_SYNC_ENABLED = true;

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
    planningNotes: typeof data?.planningNotes === "string" ? data.planningNotes : "",
  };
}

export async function loadDashboardData() {
  const snap = await getDoc(dashboardRef());
  if (!snap.exists()) return null;
  return cleanForFirestore(snap.data());
}

export async function saveDashboardData(data) {
  // Full document replacement. No merge. Deleted rows stay deleted.
  await setDoc(dashboardRef(), {
    ...cleanForFirestore(data),
    updatedAt: serverTimestamp(),
  });
}

export async function clearDashboardData() {
  await setDoc(dashboardRef(), {
    registrations: [],
    volunteers: [],
    rooms: [],
    schedule: [],
    planningNotes: "",
    updatedAt: serverTimestamp(),
    clearedAt: serverTimestamp(),
  });
}

export async function deleteDashboardDocument() {
  await deleteDoc(dashboardRef());
}
