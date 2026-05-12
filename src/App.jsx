import { useMemo, useState } from "react";
import { useDashboardAutosave } from "./useDashboardAutosave";

const defaultDashboardData = {
  registrations: [],
  volunteers: [],
  rooms: [],
  schedule: [],
  planningNotes: "",
};

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const {
    dashboardData,
    setDashboardData,
    saveStatus,
    forceSaveNow,
    resetDashboard,
    lastSavedAt,
  } = useDashboardAutosave(defaultDashboardData);

  const [activeTab, setActiveTab] = useState("overview");

  const counts = useMemo(() => {
    const registrations = dashboardData.registrations || [];
    const volunteers = dashboardData.volunteers || [];
    const rooms = dashboardData.rooms || [];
    const schedule = dashboardData.schedule || [];

    return {
      registeredKids: registrations.filter((item) => item.registered).length,
      totalKids: registrations.length,
      volunteers: volunteers.length,
      rooms: rooms.length,
      scheduleBlocks: schedule.length,
    };
  }, [dashboardData]);

  function updateField(section, id, field, value) {
    setDashboardData((current) => ({
      ...current,
      [section]: (current[section] || []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addRegistration() {
    setDashboardData((current) => ({
      ...current,
      registrations: [
        ...(current.registrations || []),
        {
          id: makeId(),
          childName: "",
          age: "",
          group: "",
          registered: true,
          notes: "",
        },
      ],
    }));
  }

  function deleteRegistration(id) {
    setDashboardData((current) => ({
      ...current,
      registrations: (current.registrations || []).filter((item) => item.id !== id),
    }));
  }

  function addVolunteer() {
    setDashboardData((current) => ({
      ...current,
      volunteers: [
        ...(current.volunteers || []),
        {
          id: makeId(),
          name: "",
          role: "",
          day: "",
          confirmed: false,
        },
      ],
    }));
  }

  function deleteVolunteer(id) {
    setDashboardData((current) => ({
      ...current,
      volunteers: (current.volunteers || []).filter((item) => item.id !== id),
    }));
  }

  function addRoom() {
    setDashboardData((current) => ({
      ...current,
      rooms: [
        ...(current.rooms || []),
        {
          id: makeId(),
          name: "",
          capacity: "",
          notes: "",
        },
      ],
    }));
  }

  function deleteRoom(id) {
    setDashboardData((current) => ({
      ...current,
      rooms: (current.rooms || []).filter((item) => item.id !== id),
    }));
  }

  function addScheduleBlock() {
    setDashboardData((current) => ({
      ...current,
      schedule: [
        ...(current.schedule || []),
        {
          id: makeId(),
          time: "",
          activity: "",
          location: "",
          leader: "",
        },
      ],
    }));
  }

  function deleteScheduleBlock(id) {
    setDashboardData((current) => ({
      ...current,
      schedule: (current.schedule || []).filter((item) => item.id !== id),
    }));
  }

  function updatePlanningNotes(value) {
    setDashboardData((current) => ({
      ...current,
      planningNotes: value,
    }));
  }

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">HOUSE Kids</p>
          <h1>VBS Dashboard</h1>
          <p className="subtitle">
            Registration, volunteers, rooms, schedule, and planning notes.
          </p>
        </div>

        <div className="saveControls">
          <div className={`saveBadge ${saveStatus === "Saved" ? "saved" : ""}`}>
            {saveStatus}
          </div>
          {lastSavedAt && <p className="lastSaved">Last saved: {lastSavedAt}</p>}
          <button type="button" onClick={forceSaveNow}>Save Now</button>
          <button type="button" className="danger" onClick={resetDashboard}>
            Clear Dashboard
          </button>
        </div>
      </header>

      <nav className="tabs">
        {["overview", "registrations", "volunteers", "rooms", "schedule", "notes"].map(
          (tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </nav>

      {activeTab === "overview" && (
        <section className="panel">
          <h2>Overview</h2>

          <div className="cards">
            <div className="card">
              <span>Registered Kids</span>
              <strong>{counts.registeredKids}</strong>
            </div>
            <div className="card">
              <span>Total Kids</span>
              <strong>{counts.totalKids}</strong>
            </div>
            <div className="card">
              <span>Volunteers</span>
              <strong>{counts.volunteers}</strong>
            </div>
            <div className="card">
              <span>Rooms</span>
              <strong>{counts.rooms}</strong>
            </div>
            <div className="card">
              <span>Schedule Blocks</span>
              <strong>{counts.scheduleBlocks}</strong>
            </div>
          </div>

          <div className="helpBox">
            <h3>Delete test</h3>
            <p>
              Delete a row, click <strong>Save Now</strong>, refresh the page, and the deleted row should stay gone. This version does not use a live Firebase listener, so old Firebase data should not pop back onto the screen after a delete.
            </p>
          </div>
        </section>
      )}

      {activeTab === "registrations" && (
        <section className="panel">
          <div className="sectionHeader">
            <h2>Registrations</h2>
            <button type="button" onClick={addRegistration}>Add Child</button>
          </div>

          <div className="table">
            <div className="tableHeader registrationsGrid">
              <span>Child Name</span>
              <span>Age</span>
              <span>Group</span>
              <span>Registered</span>
              <span>Notes</span>
              <span></span>
            </div>

            {(dashboardData.registrations || []).map((item) => (
              <div className="tableRow registrationsGrid" key={item.id}>
                <input
                  value={item.childName || ""}
                  onChange={(event) =>
                    updateField("registrations", item.id, "childName", event.target.value)
                  }
                  placeholder="Child name"
                />
                <input
                  value={item.age || ""}
                  onChange={(event) =>
                    updateField("registrations", item.id, "age", event.target.value)
                  }
                  placeholder="Age"
                />
                <input
                  value={item.group || ""}
                  onChange={(event) =>
                    updateField("registrations", item.id, "group", event.target.value)
                  }
                  placeholder="Group"
                />
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    checked={Boolean(item.registered)}
                    onChange={(event) =>
                      updateField("registrations", item.id, "registered", event.target.checked)
                    }
                  />
                  Yes
                </label>
                <input
                  value={item.notes || ""}
                  onChange={(event) =>
                    updateField("registrations", item.id, "notes", event.target.value)
                  }
                  placeholder="Notes"
                />
                <button type="button" className="danger" onClick={() => deleteRegistration(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "volunteers" && (
        <section className="panel">
          <div className="sectionHeader">
            <h2>Volunteers</h2>
            <button type="button" onClick={addVolunteer}>Add Volunteer</button>
          </div>

          <div className="table">
            <div className="tableHeader volunteersGrid">
              <span>Name</span>
              <span>Role</span>
              <span>Day</span>
              <span>Confirmed</span>
              <span></span>
            </div>

            {(dashboardData.volunteers || []).map((item) => (
              <div className="tableRow volunteersGrid" key={item.id}>
                <input
                  value={item.name || ""}
                  onChange={(event) =>
                    updateField("volunteers", item.id, "name", event.target.value)
                  }
                  placeholder="Volunteer name"
                />
                <input
                  value={item.role || ""}
                  onChange={(event) =>
                    updateField("volunteers", item.id, "role", event.target.value)
                  }
                  placeholder="Role"
                />
                <input
                  value={item.day || ""}
                  onChange={(event) =>
                    updateField("volunteers", item.id, "day", event.target.value)
                  }
                  placeholder="Day"
                />
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    checked={Boolean(item.confirmed)}
                    onChange={(event) =>
                      updateField("volunteers", item.id, "confirmed", event.target.checked)
                    }
                  />
                  Yes
                </label>
                <button type="button" className="danger" onClick={() => deleteVolunteer(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "rooms" && (
        <section className="panel">
          <div className="sectionHeader">
            <h2>Rooms</h2>
            <button type="button" onClick={addRoom}>Add Room</button>
          </div>

          <div className="table">
            <div className="tableHeader roomsGrid">
              <span>Room Name</span>
              <span>Capacity</span>
              <span>Notes</span>
              <span></span>
            </div>

            {(dashboardData.rooms || []).map((item) => (
              <div className="tableRow roomsGrid" key={item.id}>
                <input
                  value={item.name || ""}
                  onChange={(event) => updateField("rooms", item.id, "name", event.target.value)}
                  placeholder="Room name"
                />
                <input
                  value={item.capacity || ""}
                  onChange={(event) =>
                    updateField("rooms", item.id, "capacity", event.target.value)
                  }
                  placeholder="Capacity"
                />
                <input
                  value={item.notes || ""}
                  onChange={(event) => updateField("rooms", item.id, "notes", event.target.value)}
                  placeholder="Notes"
                />
                <button type="button" className="danger" onClick={() => deleteRoom(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "schedule" && (
        <section className="panel">
          <div className="sectionHeader">
            <h2>Schedule</h2>
            <button type="button" onClick={addScheduleBlock}>Add Schedule Block</button>
          </div>

          <div className="table">
            <div className="tableHeader scheduleGrid">
              <span>Time</span>
              <span>Activity</span>
              <span>Location</span>
              <span>Leader</span>
              <span></span>
            </div>

            {(dashboardData.schedule || []).map((item) => (
              <div className="tableRow scheduleGrid" key={item.id}>
                <input
                  value={item.time || ""}
                  onChange={(event) => updateField("schedule", item.id, "time", event.target.value)}
                  placeholder="9:00 AM"
                />
                <input
                  value={item.activity || ""}
                  onChange={(event) =>
                    updateField("schedule", item.id, "activity", event.target.value)
                  }
                  placeholder="Activity"
                />
                <input
                  value={item.location || ""}
                  onChange={(event) =>
                    updateField("schedule", item.id, "location", event.target.value)
                  }
                  placeholder="Location"
                />
                <input
                  value={item.leader || ""}
                  onChange={(event) => updateField("schedule", item.id, "leader", event.target.value)}
                  placeholder="Leader"
                />
                <button type="button" className="danger" onClick={() => deleteScheduleBlock(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "notes" && (
        <section className="panel">
          <h2>Planning Notes</h2>
          <textarea
            className="notesBox"
            value={dashboardData.planningNotes || ""}
            onChange={(event) => updatePlanningNotes(event.target.value)}
            placeholder="Write planning notes here. These notes autosave to Firebase."
          />
        </section>
      )}
    </main>
  );
}
