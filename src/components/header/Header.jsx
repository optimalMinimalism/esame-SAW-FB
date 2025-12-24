import "./Header_styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { US } from "country-flag-icons/react/3x2";
import { IT } from "country-flag-icons/react/3x2";
import { useNavigate } from "react-router-dom";

// images and urls
import logo from "../../assets/logo.png";

function Header({ language, setLanguage }) {
  // Changed props
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <header>
      <div className="main">
        <img className="header-logo" src={logo} alt="Logo" onClick={goToHome} />
        <h1 className="title" onClick={goToHome}>
          Chiesa Luterana Confessionale d&apos;Italia
        </h1>
      </div>
      <div className="utils">
        <FontAwesomeIcon
          className="home-icon"
          onClick={goToHome}
          icon={faHome}
          style={{ height: "25px", cursor: "pointer" }}
        ></FontAwesomeIcon>

        <div className="lang-box">
          <IT
            style={{
              height: "20px",
              cursor: "pointer",
              opacity: language === "it" ? 1 : 0.5,
            }}
            onClick={() => setLanguage("it")}
          />
          <US
            style={{
              height: "20px",
              cursor: "pointer",
              opacity: language === "en" ? 1 : 0.5,
            }}
            onClick={() => setLanguage("en")}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
