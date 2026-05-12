import { useCallback, useEffect, useRef, useState } from "react";
import {
  loadDashboardData,
  saveDashboardData,
  clearDashboardData,
  deleteDashboardDocument,
  FIREBASE_SYNC_ENABLED,
} from "./firebase";

const LOCAL_BACKUP_KEY = "vbsdashboard.localBackup.v2";

function normalizeDashboardData(data, fallback) {
  return {
    registrations: Array.isArray(data?.registrations)
      ? data.registrations
      : fallback.registrations || [],
    volunteers: Array.isArray(data?.volunteers)
      ? data.volunteers
      : fallback.volunteers || [],
    rooms: Array.isArray(data?.rooms) ? data.rooms : fallback.rooms || [],
    schedule: Array.isArray(data?.schedule) ? data.schedule : fallback.schedule || [],
    planningNotes:
      typeof data?.planningNotes === "string"
        ? data.planningNotes
        : fallback.planningNotes || "",
  };
}

function readLocalBackup() {
  try {
    const raw = window.localStorage.getItem(LOCAL_BACKUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Could not read local backup:", error);
    return null;
  }
}

function writeLocalBackup(data) {
  try {
    window.localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Could not write local backup:", error);
  }
}

export function useDashboardAutosave(initialData) {
  const emptyInitialData = normalizeDashboardData(initialData, initialData);
  const [dashboardData, setDashboardDataState] = useState(emptyInitialData);
  const [saveStatus, setSaveStatus] = useState(
    FIREBASE_SYNC_ENABLED ? "Loading Firestore..." : "Firestore sync is off"
  );

  const loadedRef = useRef(false);
  const saveTimerRef = useRef(null);
  const latestDataRef = useRef(emptyInitialData);

  const saveNow = useCallback(
    async (dataOverride) => {
      const nextData = normalizeDashboardData(
        dataOverride || latestDataRef.current,
        emptyInitialData
      );

      latestDataRef.current = nextData;
      writeLocalBackup(nextData);

      if (!FIREBASE_SYNC_ENABLED) {
        setSaveStatus("Saved locally only");
        return;
      }

      try {
        clearTimeout(saveTimerRef.current);
        setSaveStatus("Saving to Firestore...");
        await saveDashboardData(nextData);
        setSaveStatus("Saved to Firestore");
      } catch (error) {
        console.error("Firestore save error:", error);
        setSaveStatus("Firestore save failed");
      }
    },
    [emptyInitialData]
  );

  const setDashboardData = useCallback(
    (updater, options = {}) => {
      setDashboardDataState((current) => {
        const nextRaw = typeof updater === "function" ? updater(current) : updater;
        const nextData = normalizeDashboardData(nextRaw, emptyInitialData);
        latestDataRef.current = nextData;
        writeLocalBackup(nextData);

        if (loadedRef.current && options.saveImmediately) {
          void saveNow(nextData);
        }

        return nextData;
      });
    },
    [emptyInitialData, saveNow]
  );

  const clearEverything = useCallback(async () => {
    const emptyData = normalizeDashboardData(emptyInitialData, emptyInitialData);
    latestDataRef.current = emptyData;
    setDashboardDataState(emptyData);
    writeLocalBackup(emptyData);

    if (!FIREBASE_SYNC_ENABLED) {
      setSaveStatus("Cleared locally only");
      return;
    }

    try {
      clearTimeout(saveTimerRef.current);
      setSaveStatus("Clearing Firestore...");
      await clearDashboardData(emptyData);
      setSaveStatus("Firestore cleared");
    } catch (error) {
      console.error("Firestore clear error:", error);
      setSaveStatus("Firestore clear failed");
    }
  }, [emptyInitialData]);

  const deleteFirestoreDocument = useCallback(async () => {
    if (!FIREBASE_SYNC_ENABLED) {
      setSaveStatus("Firestore sync is off");
      return;
    }

    try {
      clearTimeout(saveTimerRef.current);
      setSaveStatus("Deleting Firestore document...");
      await deleteDashboardDocument();
      const emptyData = normalizeDashboardData(emptyInitialData, emptyInitialData);
      latestDataRef.current = emptyData;
      setDashboardDataState(emptyData);
      writeLocalBackup(emptyData);
      setSaveStatus("Firestore document deleted");
    } catch (error) {
      console.error("Firestore delete error:", error);
      setSaveStatus("Firestore delete failed");
    }
  }, [emptyInitialData]);

  useEffect(() => {
    let isMounted = true;

    async function loadOnce() {
      try {
        let startingData = null;

        if (FIREBASE_SYNC_ENABLED) {
          startingData = await loadDashboardData();
        }

        if (!startingData) {
          startingData = readLocalBackup();
        }

        const cleanData = normalizeDashboardData(startingData || emptyInitialData, emptyInitialData);

        if (!isMounted) return;

        latestDataRef.current = cleanData;
        setDashboardDataState(cleanData);
        writeLocalBackup(cleanData);
        loadedRef.current = true;
        setSaveStatus(startingData ? "Loaded saved dashboard" : "Ready");
      } catch (error) {
        console.error("Firestore load error:", error);

        const localBackup = normalizeDashboardData(readLocalBackup() || emptyInitialData, emptyInitialData);

        if (!isMounted) return;

        latestDataRef.current = localBackup;
        setDashboardDataState(localBackup);
        loadedRef.current = true;
        setSaveStatus("Loaded local backup");
      }
    }

    loadOnce();

    return () => {
      isMounted = false;
      clearTimeout(saveTimerRef.current);
    };
  }, [emptyInitialData]);

  useEffect(() => {
    if (!loadedRef.current) return;

    clearTimeout(saveTimerRef.current);
    setSaveStatus(FIREBASE_SYNC_ENABLED ? "Unsaved Firestore changes" : "Unsaved local changes");

    saveTimerRef.current = setTimeout(() => {
      void saveNow(dashboardData);
    }, 450);

    return () => clearTimeout(saveTimerRef.current);
  }, [dashboardData, saveNow]);

  return {
    dashboardData,
    setDashboardData,
    saveStatus,
    saveNow,
    clearEverything,
    deleteFirestoreDocument,
    firestoreEnabled: FIREBASE_SYNC_ENABLED,
  };
}
