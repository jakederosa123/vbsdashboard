import { useEffect, useRef, useState } from "react";
import {
  loadDashboardData,
  saveDashboardData,
  listenToDashboardData,
  FIREBASE_SYNC_ENABLED,
} from "./firebase";

export function useDashboardAutosave(initialData) {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [saveStatus, setSaveStatus] = useState(
    FIREBASE_SYNC_ENABLED ? "Loading saved data..." : "Firebase sync is off"
  );

  const loadedRef = useRef(false);
  const saveTimerRef = useRef(null);
  const firstRemoteLoadRef = useRef(true);

  useEffect(() => {
    async function loadSavedData() {
      try {
        const saved = await loadDashboardData();

        if (saved) {
          setDashboardData((current) => ({
            ...current,
            ...saved,
          }));
          setSaveStatus("Loaded saved dashboard");
        } else {
          setSaveStatus("No saved dashboard yet");
        }

        loadedRef.current = true;
      } catch (error) {
        console.error("Firebase load error:", error);
        setSaveStatus("Could not load saved dashboard");
        loadedRef.current = true;
      }
    }

    loadSavedData();

    const unsubscribe = listenToDashboardData((saved) => {
      if (!saved) return;

      if (firstRemoteLoadRef.current) {
        firstRemoteLoadRef.current = false;
        return;
      }

      setDashboardData((current) => ({
        ...current,
        ...saved,
      }));

      setSaveStatus("Synced");
    });

    return () => {
      unsubscribe();
      clearTimeout(saveTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    if (!FIREBASE_SYNC_ENABLED) return;

    clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(async () => {
      try {
        setSaveStatus("Saving...");
        await saveDashboardData(dashboardData);
        setSaveStatus("Saved");
      } catch (error) {
        console.error("Firebase save error:", error);
        setSaveStatus("Save failed");
      }
    }, 700);

    return () => clearTimeout(saveTimerRef.current);
  }, [dashboardData]);

  return {
    dashboardData,
    setDashboardData,
    saveStatus,
  };
}
