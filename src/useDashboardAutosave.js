import { useCallback, useEffect, useRef, useState } from "react";
import {
  loadDashboardData,
  saveDashboardData,
  clearDashboardData,
  deleteDashboardDocument,
  FIREBASE_SYNC_ENABLED,
} from "./firebase";

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
    groups: Array.isArray(data?.groups) ? data.groups : fallback.groups || [],
    stations: Array.isArray(data?.stations) ? data.stations : fallback.stations || [],
    dailyShape: Array.isArray(data?.dailyShape) ? data.dailyShape : fallback.dailyShape || [],
    weekFlows: Array.isArray(data?.weekFlows) ? data.weekFlows : fallback.weekFlows || [],
    planningNotes:
      typeof data?.planningNotes === "string"
        ? data.planningNotes
        : fallback.planningNotes || "",
  };
}

export function useDashboardAutosave(initialData) {
  // Keep the fallback stable. If this object changes on every render,
  // the hook can reload Firestore repeatedly and rehydrate deleted rows.
  const initialDataRef = useRef(null);
  if (!initialDataRef.current) {
    initialDataRef.current = normalizeDashboardData(initialData, initialData);
  }

  const [dashboardData, setDashboardDataState] = useState(initialDataRef.current);
  const [saveStatus, setSaveStatus] = useState(
    FIREBASE_SYNC_ENABLED ? "Loading Firestore..." : "Firestore sync is off"
  );

  const loadedRef = useRef(false);
  const latestDataRef = useRef(initialDataRef.current);
  const saveRequestRef = useRef(0);

  const saveNow = useCallback(async (dataOverride) => {
    const requestId = saveRequestRef.current + 1;
    saveRequestRef.current = requestId;

    const cleanData = normalizeDashboardData(
      dataOverride || latestDataRef.current,
      initialDataRef.current
    );

    latestDataRef.current = cleanData;

    if (!FIREBASE_SYNC_ENABLED) {
      setSaveStatus("Firestore sync is off");
      return;
    }

    try {
      setSaveStatus("Saving to Firestore...");
      await saveDashboardData(cleanData);

      // Only the newest save is allowed to update the status.
      if (saveRequestRef.current === requestId) {
        setSaveStatus("Saved to Firestore");
      }
    } catch (error) {
      console.error("Firestore save error:", error);
      setSaveStatus("Firestore save failed");
    }
  }, []);

  const setDashboardData = useCallback(
    (updater) => {
      setDashboardDataState((current) => {
        const nextRaw = typeof updater === "function" ? updater(current) : updater;
        const cleanNext = normalizeDashboardData(nextRaw, initialDataRef.current);

        latestDataRef.current = cleanNext;

        // Save every user edit immediately. This prevents refreshes from restoring old rows.
        if (loadedRef.current) {
          void saveNow(cleanNext);
        }

        return cleanNext;
      });
    },
    [saveNow]
  );

  const clearEverything = useCallback(async () => {
    const emptyData = normalizeDashboardData({}, initialDataRef.current);
    latestDataRef.current = emptyData;
    setDashboardDataState(emptyData);

    try {
      setSaveStatus("Clearing Firestore...");
      await clearDashboardData();
      setSaveStatus("Firestore cleared");
    } catch (error) {
      console.error("Firestore clear error:", error);
      setSaveStatus("Firestore clear failed");
    }
  }, []);

  const deleteFirestoreDocument = useCallback(async () => {
    const emptyData = normalizeDashboardData({}, initialDataRef.current);
    latestDataRef.current = emptyData;
    setDashboardDataState(emptyData);

    try {
      setSaveStatus("Deleting Firestore document...");
      await deleteDashboardDocument();
      setSaveStatus("Firestore document deleted");
    } catch (error) {
      console.error("Firestore delete error:", error);
      setSaveStatus("Firestore delete failed");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadOnce() {
      try {
        const savedData = await loadDashboardData();
        const cleanData = normalizeDashboardData(
          savedData || initialDataRef.current,
          initialDataRef.current
        );

        if (!isMounted) return;

        latestDataRef.current = cleanData;
        setDashboardDataState(cleanData);
        loadedRef.current = true;
        setSaveStatus(savedData ? "Loaded from Firestore" : "Ready");
      } catch (error) {
        console.error("Firestore load error:", error);

        if (!isMounted) return;

        latestDataRef.current = initialDataRef.current;
        setDashboardDataState(initialDataRef.current);
        loadedRef.current = true;
        setSaveStatus("Firestore load failed");
      }
    }

    loadOnce();

    return () => {
      isMounted = false;
    };
  }, []);

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
