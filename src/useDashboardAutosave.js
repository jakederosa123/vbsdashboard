import { useEffect, useRef, useState } from "react";
import { loadDashboardData, saveDashboardData, FIREBASE_SYNC_ENABLED } from "./firebase";

const LOCAL_BACKUP_KEY = "vbsdashboard-local-backup";

function normalizeDashboardData(data, fallback) {
  return {
    registrations: Array.isArray(data?.registrations) ? data.registrations : fallback.registrations || [],
    volunteers: Array.isArray(data?.volunteers) ? data.volunteers : fallback.volunteers || [],
    rooms: Array.isArray(data?.rooms) ? data.rooms : fallback.rooms || [],
    schedule: Array.isArray(data?.schedule) ? data.schedule : fallback.schedule || [],
    planningNotes: typeof data?.planningNotes === "string" ? data.planningNotes : fallback.planningNotes || "",
  };
}

function loadLocalBackup(fallback) {
  try {
    const raw = window.localStorage.getItem(LOCAL_BACKUP_KEY);
    if (!raw) return null;
    return normalizeDashboardData(JSON.parse(raw), fallback);
  } catch (error) {
    console.warn("Could not read local dashboard backup:", error);
    return null;
  }
}

function saveLocalBackup(data) {
  try {
    window.localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Could not write local dashboard backup:", error);
  }
}

export function useDashboardAutosave(initialData) {
  const cleanInitialData = normalizeDashboardData(initialData, initialData);
  const [dashboardData, setDashboardData] = useState(cleanInitialData);
  const [saveStatus, setSaveStatus] = useState(
    FIREBASE_SYNC_ENABLED ? "Loading saved data..." : "Firebase sync is off"
  );
  const [lastSavedAt, setLastSavedAt] = useState("");

  const hasLoadedRef = useRef(false);
  const saveTimerRef = useRef(null);
  const latestDataRef = useRef(cleanInitialData);

  useEffect(() => {
    latestDataRef.current = dashboardData;
  }, [dashboardData]);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialData() {
      const localBackup = loadLocalBackup(cleanInitialData);

      try {
        if (!FIREBASE_SYNC_ENABLED) {
          if (localBackup && !cancelled) {
            setDashboardData(localBackup);
          }
          setSaveStatus("Local backup only");
          hasLoadedRef.current = true;
          return;
        }

        const saved = await loadDashboardData();
        if (cancelled) return;

        if (saved) {
          const cleanSaved = normalizeDashboardData(saved, cleanInitialData);
          setDashboardData(cleanSaved);
          saveLocalBackup(cleanSaved);
          setSaveStatus("Loaded saved dashboard");
        } else if (localBackup) {
          setDashboardData(localBackup);
          await saveDashboardData(localBackup);
          setSaveStatus("Restored local backup");
        } else {
          setDashboardData(cleanInitialData);
          await saveDashboardData(cleanInitialData);
          setSaveStatus("Created blank dashboard");
        }
      } catch (error) {
        console.error("Firebase load error:", error);
        if (localBackup && !cancelled) {
          setDashboardData(localBackup);
          setSaveStatus("Firebase failed, using local backup");
        } else if (!cancelled) {
          setSaveStatus("Could not load saved dashboard");
        }
      } finally {
        if (!cancelled) {
          hasLoadedRef.current = true;
        }
      }
    }

    loadInitialData();

    return () => {
      cancelled = true;
      clearTimeout(saveTimerRef.current);
    };
  }, []);

  async function saveNow(dataToSave = latestDataRef.current) {
    const cleanData = normalizeDashboardData(dataToSave, cleanInitialData);
    saveLocalBackup(cleanData);

    if (!FIREBASE_SYNC_ENABLED) {
      setSaveStatus("Saved locally only");
      setLastSavedAt(new Date().toLocaleTimeString());
      return;
    }

    try {
      setSaveStatus("Saving...");
      await saveDashboardData(cleanData);
      setSaveStatus("Saved");
      setLastSavedAt(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Firebase save error:", error);
      setSaveStatus("Save failed, saved locally");
    }
  }

  useEffect(() => {
    if (!hasLoadedRef.current) return;

    clearTimeout(saveTimerRef.current);
    setSaveStatus("Unsaved changes");

    saveTimerRef.current = setTimeout(() => {
      saveNow(dashboardData);
    }, 500);

    return () => clearTimeout(saveTimerRef.current);
  }, [dashboardData]);

  function forceSaveNow() {
    clearTimeout(saveTimerRef.current);
    return saveNow(latestDataRef.current);
  }

  function resetDashboard() {
    const blankData = normalizeDashboardData(initialData, initialData);
    setDashboardData(blankData);
    saveNow(blankData);
  }

  return {
    dashboardData,
    setDashboardData,
    saveStatus,
    forceSaveNow,
    resetDashboard,
    lastSavedAt,
  };
}
