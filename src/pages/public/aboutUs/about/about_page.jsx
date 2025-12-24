import "./about_styles.scss";
import Header from "../../../../components/header/Header.jsx";
import Nav from "../../../../components/nav/Nav.jsx";
import Footer from "../../../../components/footer/Footer.jsx";
import CitBox from "../../../../components/citBox/CitBox.jsx";
// import { useState, useEffect } from "react";
import crucifix from "../../../../assets/Luther_crucifix_Cranach.png";

// // Key for local storage (should match the one in Header)
// const LANGUAGE_STORAGE_KEY = "user_language";

function About_page({ language, setLanguage }) {
  //old implementation
  // const [language, setLanguage] = useState(() => {
  //   const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  //   return savedLanguage || "it"; // Default to Italian if no language is saved
  // });

  // // Save language to local storage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  // }, [language]);

  // Translations object
  const translations = {
    en: {
      title: "What We Believe",
      verse:
        "But now the righteousness of God has been manifested apart from the law, although the Law and the Prophets bear witness to it— the righteousness of God through faith in Jesus Christ for all who believe. For there is no distinction: for all have sinned and fall short of the glory of God, and are justified by his grace as a gift, through the redemption that is in Christ Jesus.",
      reference: "Romans 3:21-24",
      p1: "We believe that the Holy Scriptures — all 66 canonical books — in their original languages are the true, inerrant, effective, and infallible Word of God.",
      p2: "We confess with the historic Christian Church faith in the Triune God: the Father, the Son, and the Holy Spirit.",
      p3: "Furthermore, we fully subscribe to the Book of Concord of 1580 as a correct interpretation of the Holy Scriptures and as our confession of faith.",
      p4: "The Book of Concord gathers into one volume the Lutheran confessions of faith:",
      list1: "The Apostles', Nicene, and Athanasian Creeds",
      list2: "The Augsburg Confession of 1530",
      list3: "The Apology of the Augsburg Confession",
      list4: "The Smalcald Articles",
      list5: "The Treatise on the Power and Primacy of the Pope",
      list6: "Luther's Small Catechism",
      list7: "Luther's Large Catechism",
      list8: "The Formula of Concord",
      p5: "Confessional Lutheran doctrine clearly proclaims the biblical teaching of the universal lack among all humans of the righteousness required by God. And above all, it proclaims the Good News of the divine intervention that constitutes our complete redemption from eternal damnation through the atoning sacrifice of the Lord Jesus Christ on the cross of Golgotha around 2,000 years ago, and in His glorious resurrection from the dead.",
    },
    it: {
      title: "Cosa crediamo",
      verse:
        "Ma ora, indipendentemente dalla legge, è stata manifestata la giustizia di Dio, alla quale rendono testimonianza la legge e i profeti, cioè la giustizia di Dio mediante la fede in Gesù Cristo verso tutti e sopra tutti coloro che credono, perché non c'è distinzione; poiché tutti hanno peccato e sono privi della gloria di Dio, ma sono gratuitamente giustificati per la sua grazia, mediante la redenzione che è in Cristo Gesù.",
      reference: "Romani 3:21-24",
      p1: "Crediamo che le Sacre Scritture, cioè tutti e 66 libri canonici della Bibbia, nella loro lingua originale sono la vera, inerrante, efficace e infallibile parola di Dio.",
      p2: "Confessiamo con tutta la chiesa cristiana storica la fede nel Dio Triuno, il Padre, il Figlio e lo Spirito Santo.",
      p3: "Inoltre, sottoscriviamo integralmente il Libro di Concordia di 1580 come una interpretazione corretta delle Sacre Scritture e come la nostra confessione di fede.",
      p4: "Il Libro di Concordia riunisce in un unico volume le Confessioni di fede luterane:",
      list1: "I Credo Apostolico, Niceno-costantinopolitano e Atanasiano",
      list2: "La Confessione Augusta di 1530",
      list3: "L'Apologia (difesa) della Confessione Augustana",
      list4: "Gli Articoli di Smacalda",
      list5: "Il Trattato sul Potere e Primato del Papa",
      list6: "Il Piccolo Catechismo di Lutero",
      list7: "Il Grande Catechismo di Lutero",
      list8: "La Formula della Concordia",
      p5: "La dottrina luterana confessionale proclama in modo trasparente l'insegnamento biblico della carenza universale da tutti gli esseri umani della rettidudine richiesta da Dio. E proclama soprattutto la Buona Notizia dell'intervento divino che costituisce il nostro completo riscatto dalla perdizione eterna nel sacrificio propiziatorio del Signor Gesù Cristo sulla croce del Golgota circa 2000 anni fa, e nella Sua gloriosa risurrezione dai morti.",
    },
  };

  // Get current translations
  const t = translations[language];

  return (
    <div className="about-root">
      <Header setLanguage={setLanguage} language={language} />
      <Nav current="about-what" Language={language} />
      <div className="about-container">
        <div className="content-box">
          <h1>{t.title}</h1>
          <CitBox text={t.verse} reference={t.reference} />

          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
          <p>{t.p4}</p>

          <ul>
            <li>{t.list1}</li>
            <li>{t.list2}</li>
            <li>{t.list3}</li>
            <li>{t.list4}</li>
            <li>{t.list5}</li>
            <li>{t.list6}</li>
            <li>{t.list7}</li>
            <li>{t.list8}</li>
          </ul>

          <img src={crucifix} alt="Crucifix" />

          <p>{t.p5}</p>
        </div>
      </div>
      <Footer Language={language} />
    </div>
  );
}

export default About_page;
