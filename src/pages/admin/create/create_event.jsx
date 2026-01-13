import "./create_styles.scss";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";
import { formatTimestamp } from "../../../utils/timeStamp";
import { useNavigate } from "react-router-dom";

function CreateEvent_page({ language, setLanguage }) {
  const translations = {
    en: {
      title: "Create event",
      manage: "Manage events",
      eventName: "Event name",
      eventDate: "Date",
      submit: "Create",
      delete: "Delete",
      confirm: "Are you sure?",
    },
    it: {
      title: "Crea evento",
      manage: "Gestione eventi",
      eventName: "Nome evento",
      eventDate: "Data",
      submit: "Crea",
      delete: "Elimina",
      confirm: "Sei sicuro?",
    },
  };

  const t = translations[language] || translations.it;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const q = query(collection(db, "events"), orderBy("date", "desc"));
      const snap = await getDocs(q);
      setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "events"), {
        name,
        date: Timestamp.fromDate(new Date(date)),
        createdAt: serverTimestamp(),
      });

      setName("");
      setDate("");
      fetchEvents();
    } catch (err) {
      console.error("Error creating event:", err);
    }
  }

  async function deleteEvent(id) {
    try {
      if (!window.confirm(t.confirm)) return;

      await deleteDoc(doc(db, "events", id));
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  }

  const navigate = useNavigate();
  const goToAdimPage = () => {
    navigate("/admin");
  };

  return (
    <div className="admin-root">
      <Header language={language} setLanguage={setLanguage} />

      <div className="admin-container">
        <div className="admin-flex">
          {/* CREATE */}
          <div className="admin-box">
            <h1>{t.title}</h1>

            <form onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.eventName}
                required
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <button type="submit">{t.submit}</button>
            </form>
          </div>

          {/* MANAGE */}
          <div className="admin-box">
            <h2>{t.manage}</h2>

            <ul className="admin-list">
              {events.map((e) => (
                <li key={e.id}>
                  <span>
                    {e.name} –{" "}
                    {formatTimestamp(
                      e.date,
                      language === "it" ? "it-IT" : "en-GB"
                    )}
                  </span>
                  <button onClick={() => deleteEvent(e.id)}>{t.delete}</button>
                </li>
              ))}
            </ul>
          </div>
          <button className="back-button" onClick={goToAdimPage}>
            Back
          </button>
        </div>
      </div>

      <Footer Language={language} />
    </div>
  );
}

export default CreateEvent_page;
