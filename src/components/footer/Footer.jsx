import "./Footer_styles.scss";

import lcmsLogo from "../../assets/LCMS_logo.png";
import eurLogo from "../../assets/eurasia.png";
import logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import { registerPushAnonymous } from "../../utils/registerPush.js";

function Footer({ style = {}, Language }) {
  const navigate = useNavigate();

  const [pushPermission, setPushPermission] = useState("default");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    /* AUTH STATE */
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    /* NOTIFICATION PERMISSION */
    if ("Notification" in window) {
      setPushPermission(Notification.permission);
    }

    return () => unsub();
  }, []);

  const isEnglish = Language === "en";

  const t = {
    it: {
      login: "Accesso pastori",
      panel: "Pannello di gestione",
      newsletter: "Newsletter",
      alreadySubscribed: "Sei già iscritto alla newsletter",
      verse: `"ma noi predichiamo Cristo crocifisso" – 1 Corinzi 1:23`,
    },
    en: {
      login: "Pastor's login",
      panel: "Management panel",
      newsletter: "Newsletter",
      alreadySubscribed: "You are already subscribed to the newsletter",
      verse: `"but we preach Christ crucified" – 1 Corinthians 1:23`,
    },
  };

  const lang = isEnglish ? t.en : t.it;

  const goToHome = () => navigate("/");
  const goToLogin = () => navigate("/login");
  const goToAdmin = () => navigate("/admin");

  const handleNewsletterClick = async () => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      alert(lang.alreadySubscribed);
      return;
    }

    await registerPushAnonymous();
    setPushPermission(Notification.permission);
  };

  return (
    <footer style={style}>
      {/* LEFT */}
      <div className="lcms-box">
        <a href="https://lcms.org/" target="_blank" rel="noreferrer">
          <img src={lcmsLogo} alt="lcms" className="lcms-logo" />
          <img src={eurLogo} alt="lcms Eurasia" className="lcms-eurasia" />
        </a>
      </div>

      {/* CENTER */}
      <div className="main-box">
        <div className="footer-title-box" onClick={goToHome}>
          <img src={logo} alt="logo" className="footer-logo" />
          <div className="footer-title">
            <h3>Chiesa Luterana Confessionale d&apos;Italia</h3>
            <p>{lang.verse}</p>
          </div>
        </div>

        <p className="copyright">
          ©2026 Chiesa Luterana Confessionale d&apos;Italia
        </p>
      </div>

      {/* RIGHT */}
      <div className="right-box">
        {/* NEWSLETTER */}
        <div className="news-box" onClick={handleNewsletterClick}>
          <p>{lang.newsletter}</p>
        </div>

        {/* FACEBOOK */}
        <div className="facebook-box">
          <a
            href="https://www.facebook.com/luteranaConfessionale"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" color="white" />
          </a>
        </div>

        {/* LOGIN / ADMIN */}
        <div className="login-box" onClick={isLoggedIn ? goToAdmin : goToLogin}>
          <p>{isLoggedIn ? lang.panel : lang.login}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
