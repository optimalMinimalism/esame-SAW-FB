import "./home_styles.scss";

import Header from "../../../components/header/Header.jsx";
import Nav from "../../../components/nav/Nav.jsx";
import Footer from "../../../components/footer/Footer.jsx";

import { useEffect, useState } from "react";

// Translation dictionary
const translations = {
  en: {
    "Benvenuti!": "Welcome!",
    "home.testo":
      "The Confessional Lutheran Church of Italy is founded on the message of Christ crucified for the forgiveness of sins for the church and the whole world.",
  },
  it: {
    "Benvenuti!": "Benvenuti!",
    "home.testo":
      "La Chiesa Luterana Confessionale d'Italia è fondata sul messaggio di Cristo crocifisso per il perdono dei peccati in favore della chiesa e di tutto il mondo.",
  },
};

function Home_page({ language, setLanguage }) {
  // Get the appropriate translation based on the current language
  const t = (key) => translations[language][key] || key;

  return (
    <>
      <div className="home-root">
        <Header language={language} setLanguage={setLanguage} />
        <Nav current="home" Language={language} />
        <div className="home-container">
          <div className="background-box">
            <div className="content-box">
              <h1>{t("Benvenuti!")}</h1>
              <p>{t("home.testo")}</p>
            </div>
          </div>
        </div>
        <Footer style={{ position: "fixed" }} Language={language} />
      </div>
    </>
  );
}

export default Home_page;
