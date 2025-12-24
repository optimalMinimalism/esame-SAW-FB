import "./Footer_styles.scss";

import lcmsLogo from "../../assets/LCMS_logo.png";
import eurLogo from "../../assets/eurasia.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import { registerPushAnonymous } from "../../utils/registerPush.js";

function Footer({ style = {}, Language }) {
  const [pushStatus, setPushStatus] = useState("unknown");

  useEffect(() => {
    if (!("Notification" in window)) return;

    setPushStatus(Notification.permission);
  }, []);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const isEnglish = Language === "en";

  return (
    <footer style={style}>
      <div className="lcms-box">
        <a href="https://lcms.org/">
          <img src={lcmsLogo} alt="lcms" className="lcms-logo" />
          <img src={eurLogo} alt="lcms Eurasia" className="lcms-eurasia" />
        </a>
      </div>

      <div className="main-box">
        <div className="footer-title-box" onClick={goToHome}>
          <img src={logo} alt="logo" className="footer-logo" />
          <div className="footer-title">
            <h3>Chiesa Luterana Confessionale d&apos;Italia</h3>
            <p>
              {isEnglish
                ? `"but we preach Christ crucified" – 1 Corinthians 1:23`
                : `"ma noi predichiamo Cristo crocifisso" – 1 Corinzi 1:23`}
            </p>
          </div>
        </div>

        <p className="copyright">
          ©2024 Chiesa Luterana Confessionale d&apos;Italia
        </p>
      </div>
      <div className="right-box">
        <div
          className="news-box"
          onClick={async () => {
            if (pushStatus === "granted") {
              alert("Sei già iscritto alla newsletter");
              return;
            }

            await registerPushAnonymous();
            setPushStatus(Notification.permission);
          }}
        >
          <p>Newsletter</p>
        </div>

        <div className="facebook-box">
          <a href="https://www.facebook.com/luteranaConfessionale">
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              color="white"
              cursor={"pointer"}
            />
          </a>
        </div>
        <div className="login-box" onClick={goToLogin}>
          <p>Pastor's login</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
