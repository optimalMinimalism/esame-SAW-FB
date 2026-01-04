import "./messages_styles.scss";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const AdminMessages = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  const i18n = {
    it: {
      title: "Messaggi ricevuti",
      empty: "Nessun messaggio ricevuto",
      subject: "Oggetto",
      unread: "Nuovo",
      markRead: "Segna come letto",
      delete: "Elimina",
      back: "Torna al pannello",
      loading: "Caricamento…",
      deleteConfirm: "Eliminare questo messaggio?"
    },
    en: {
      title: "Received messages",
      empty: "No messages received",
      subject: "Subject",
      unread: "New",
      markRead: "Mark as read",
      delete: "Delete",
      back: "Back to panel",
      loading: "Loading…",
      deleteConfirm: "Delete this message?"
    }
  };

  const t = i18n[language] || i18n.it;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setMessages([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "contactMessages"),
          where("pastorId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);

        setMessages(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data()
          }))
        );
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "contactMessages", id), { read: true });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      await deleteDoc(doc(db, "contactMessages", id));
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  return (
    <div className="messages-root">
      <Header language={language} setLanguage={setLanguage} />

      <main className="messages-main">
        <div className="messages-shell">
          <button className="messages-back" onClick={() => navigate("/admin")}>
              ← {t.back}
            </button>
          <div className="messages-box">


            <h1 className="messages-title">{t.title}</h1>

            {loading && <p className="messages-empty">{t.loading}</p>}

            {!loading && messages.length === 0 && (
              <p className="messages-empty">{t.empty}</p>
            )}

            {!loading && messages.length > 0 && (
              <div className="messages-list">
                {messages.map((m) => (
                  <article
                    key={m.id}
                    className={`message-card ${m.read ? "read" : "unread"}`}
                  >
                    <div className="message-top">
                      <div className="message-from">
                        <strong className="message-name">{m.name}</strong>
                        {!m.read && (
                          <span className="message-badge">{t.unread}</span>
                        )}
                      </div>
                      <span className="message-email">{m.email}</span>
                    </div>

                    <div className="message-subject">
                      <span className="label">{t.subject}:</span> {m.subject}
                    </div>

                    <div className="message-body">{m.message}</div>

                    <div className="message-actions">
                      {!m.read && (
                        <button onClick={() => markAsRead(m.id)}>
                          {t.markRead}
                        </button>
                      )}
                      <button
                        className="danger"
                        onClick={() => deleteMessage(m.id)}
                      >
                        {t.delete}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer Language={language} />
    </div>
  );
};

export default AdminMessages;
