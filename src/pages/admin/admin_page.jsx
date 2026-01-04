import "./admin_styles.scss";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

function Admin_page({ language, setLanguage }) {
  //* translations
  const translations = {
    en: {
      title: "Admin",
      createSermon: "Create sermon",
      createEvent: "Create event",
      logout: "Logout",
    },
    it: {
      title: "Amministrazione",
      createSermon: "Crea sermone",
      createEvent: "Crea evento",
      logout: "Esci",
    },
  };

  const t = translations[language];

  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <div className="admin-root">
      <Header language={language} setLanguage={setLanguage} />

      <div className="admin-container">
        <div className="content-box">
          <h1>{t.title}</h1>

          <ul className="admin-actions">
            <li>
              <Link to="/admin/create-sermon">{t.createSermon}</Link>
            </li>
            <li>
              <Link to="/admin/create-event">{t.createEvent}</Link>
            </li>
            <li>
              <Link to="/admin/messages" className="admin-btn">
                Messaggi ricevuti
              </Link>
            </li>
          </ul>

          <button className="logout-button" onClick={logout}>{t.logout}</button>
        </div>
      </div>

      <Footer Language={language} />
    </div>
  );
}

export default Admin_page;
