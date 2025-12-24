import "./messages_styles.scss";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const AdminMessages = ({ language, setLanguage }) => {
  const text = {
    it: {
      title: "Messaggi ricevuti",
      empty: "Nessun messaggio ricevuto",
      from: "Da",
      subject: "Oggetto",
    },
    en: {
      title: "Received messages",
      empty: "No messages received",
      from: "From",
      subject: "Subject",
    },
  };
  const navigate = useNavigate();
  const t = text[language] || text.it;

  const [messages, setMessages] = useState([]);

  const goToAdimPage = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const uid = auth.currentUser.uid;

      const q = query(
        collection(db, "contactMessages"),
        where("pastorId", "==", uid),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      setMessages(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    };

    fetchMessages();
  }, []);

  return (
    <div className="messages-root">
      <Header language={language} setLanguage={setLanguage} />

      <main className="messages-main">
        <div className="messages-shell">
          <div className="messages-box">
            <h1 className="messages-title">{t.title}</h1>

            {messages.length === 0 ? (
              <p className="messages-empty">{t.empty}</p>
            ) : (
              <div className="messages-list">
                {messages.map((m) => (
                  <article key={m.id} className="message-card">
                    <div className="message-header">
                      <div className="message-from">
                        <span className="label">{t.from}:</span>
                        <span className="value">{m.name}</span>
                      </div>
                      <div className="message-email">{m.email}</div>
                    </div>

                    <div className="message-subject">
                      <span className="label">{t.subject}:</span> {m.subject}
                    </div>

                    <div className="message-body">{m.message}</div>
                  </article>
                ))}
              </div>
            )}
          </div>
          <button className="back-button" onClick={goToAdimPage}>
            Back
          </button>
        </div>
      </main>

      <Footer Language={language} />
    </div>
  );
};

export default AdminMessages;
