import "./contact_styles.scss";

import Header from "../../../components/header/Header.jsx";
import Nav from "../../../components/nav/Nav.jsx";
import Footer from "../../../components/footer/Footer.jsx";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";

const Contact_page = ({ language, setLanguage }) => {
  const text = {
    it: {
      title: "Contattaci",
      name: "Il tuo nome",
      email: "La tua email",
      pastor: "Seleziona il pastore",
      subject: "Oggetto",
      message: "Messaggio",
      send: "Invia",
      success: "Messaggio inviato con successo",
      error: "Errore nell'invio del messaggio",
    },
    en: {
      title: "Contact Us",
      name: "Your name",
      email: "Your email",
      pastor: "Select pastor",
      subject: "Subject",
      message: "Message",
      send: "Send",
      success: "Message sent successfully",
      error: "Failed to send message",
    },
  };

  const t = text[language] || text.it;

  const [pastors, setPastors] = useState([]);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    pastorId: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const fetchPastors = async () => {
      const q = query(collection(db, "users"), where("role", "==", "pastor"));

      const snap = await getDocs(q);

      setPastors(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    };

    fetchPastors();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await addDoc(collection(db, "contactMessages"), {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        pastorId: form.pastorId,
        createdAt: Timestamp.now(),
        read: false,
      });

      setStatus("success");
      setForm({
        name: "",
        email: "",
        pastorId: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-root">
      <Header language={language} setLanguage={setLanguage} />
      <Nav current="contact" Language={language} />

      <div className="contact-container">
        <div className="contact-box">
          <h1>{t.title}</h1>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder={t.name}
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder={t.email}
              value={form.email}
              onChange={handleChange}
              required
            />

            <select
              name="pastorId"
              value={form.pastorId}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                {t.pastor}
              </option>

              {pastors.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              name="subject"
              placeholder={t.subject}
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder={t.message}
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "..." : t.send}
            </button>
          </form>

          {status === "success" && (
            <p className="contact-success">{t.success}</p>
          )}
          {status === "error" && <p className="contact-error">{t.error}</p>}
        </div>
      </div>

      <Footer Language={language} />
    </div>
  );
};

export default Contact_page;
