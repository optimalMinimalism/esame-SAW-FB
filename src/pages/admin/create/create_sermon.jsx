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

function CreateSermon_page({ language, setLanguage }) {
  const translations = {
    en: {
      title: "Create sermon",
      manage: "Manage sermons",
      sermonTitle: "Title",
      sermonDate: "Date",
      videoUrl: "YouTube URL",
      docUrl: "Google Docs URL",
      submit: "Create",
      delete: "Delete",
      confirm: "Are you sure?",
    },
    it: {
      title: "Crea sermone",
      manage: "Gestione sermoni",
      sermonTitle: "Titolo",
      sermonDate: "Data",
      videoUrl: "URL YouTube",
      docUrl: "URL Google Docs",
      submit: "Crea",
      delete: "Elimina",
      confirm: "Sei sicuro?",
    },
  };

  const t = translations[language] || translations.it;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    fetchSermons();
  }, []);

  async function fetchSermons() {
    const q = query(collection(db, "sermons"), orderBy("date", "desc"));
    const snap = await getDocs(q);
    setSermons(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("SUBMIT FIRED");

    await addDoc(collection(db, "sermons"), {
      title,
      date: Timestamp.fromDate(new Date(date)),
      videoUrl,
      docUrl,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDate("");
    setVideoUrl("");
    setDocUrl("");
    fetchSermons();
  }

  async function deleteSermon(id) {
    if (!window.confirm(t.confirm)) return;

    await deleteDoc(doc(db, "sermons", id));
    setSermons((prev) => prev.filter((s) => s.id !== id));
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.sermonTitle}
                required
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder={t.videoUrl}
              />

              <input
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
                placeholder={t.docUrl}
              />

              <button type="submit">{t.submit}</button>
            </form>
          </div>

          {/* MANAGE */}
          <div className="admin-box">
            <h2>{t.manage}</h2>

            <ul className="admin-list">
              {sermons.map((s) => (
                <li key={s.id}>
                  <span>
                    {s.title} –{" "}
                    {formatTimestamp(
                      s.date,
                      language === "it" ? "it-IT" : "en-GB"
                    )}
                  </span>
                  <button onClick={() => deleteSermon(s.id)}>{t.delete}</button>
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

export default CreateSermon_page;
