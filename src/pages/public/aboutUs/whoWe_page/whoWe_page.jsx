import "./whoWe_styles.scss";
import Header from "../../../../components/header/Header.jsx";
import Nav from "../../../../components/nav/Nav.jsx";
import Footer from "../../../../components/footer/Footer.jsx";
import CitBox from "../../../../components/citBox/CitBox.jsx";
import { Link } from "react-router-dom";

// Images
// import online0 from "../../../assets/Online0.jpg";
import online from "../../../../assets/Online1.jpg";
import roma from "../../../../assets/roma2.jpeg";
// import roma1 from "../../../assets/Roma1.jpeg";
import padova from "../../../../assets/Padova0.jpeg";
// import padova1 from "../../../assets/Padova1.jpeg";

function WhoWe_page({ language, setLanguage }) {
  // Destructure props here
  // Content for both languages
  const content = {
    en: {
      title: "Who We Are",
      paragraph1:
        "The CLCI is a mission of the Lutheran Church - Lutheran Synod, confessing the faith and doctrine based on the biblical scriptures of the Old and New Testament.",
      paragraph2:
        "The CLCI is a Lutheran church in Italy. By the means of grace administered correctly, it is part of the 'one, holy, catholic, and apostolic Church' as confessed in the Church's Creed.",
      paragraph3:
        "The CLCI is part of the worldwide community of confessional Lutherans and establishes connections with those who adhere to the same confession, both in Italy and abroad.",
      missionsTitle: "Missions and Divine Service",
      mission1Title: "Online Divine Service",
      mission1Subtitle: "(Every Sunday at 10:00 on Zoom)",
      mission2Title: "Christus Victor Church in Rome",
      mission3Title: "Concordia Church in Padova",
      contactLink:
        "For the Zoom link of the Divine Service, contact the responsible Pastor",
      citation1Text:
        "Behold, how good and pleasant it is when brothers dwell in unity!",
      citation1Reference: "Psalm 133:1",
      citation2Text:
        "And let us consider how to stir up one another to love and good works, not neglecting to meet together, as is the habit of some, but encouraging one another, and all the more as you see the Day drawing near.",
      citation2Reference: "Hebrews 10:24-25",
    },
    it: {
      title: "Chi siamo",
      paragraph1:
        "La CLCI è una missione del Chiesa Luterana-Sinodo Luterano e confessa la fede e la dottrina bibliche basate sulle Scritture profetiche e apostoliche del Nuovo e Antico Testamento.",
      paragraph2:
        "La CLCI è una chiesa luterana in Italia. In virtù dei mezzi della grazia amministrati correttamente, essa è parte della 'Chiesa una, santa, cattolica e apostolica' confessata nei Credo della Chiesa.",
      paragraph3:
        "La CLCI è parte della comunità mondiale di luterani confessionali e crea connessioni con tutti coloro che si attengono alla medesima confessione, sia in Italia che all'estero.",
      missionsTitle: "Missioni e Servizio Divino",
      mission1Title: "Servizio Divino Online",
      mission1Subtitle: "(Ogni domenica alle 10:00 su Zoom)",
      mission2Title: "Chiesa Christus Victor a Roma",
      mission3Title: "Chiesa Concordia a Padova",
      contactLink:
        "Per il link Zoom del Servizio Divino, contattare il Pastore responsabile",
      citation1Text:
        "Ecco, quant'è buono e quant'è piacevole che i fratelli dimorino insieme nell'unità!",
      citation1Reference: "Salmo 133:1",
      citation2Text:
        "E consideriamo gli uni gli altri per incitarci all'amore e alle buone opere, non abbandonando la nostra comune adunanza, come alcuni sono soliti fare, ma esortandoci a vicenda, e tanto più, che vedete avvicinarsi il giorno.",
      citation2Reference: "Ebrei 10:24-25",
    },
  };

  // Add a fallback in case language is not provided
  const currentLanguage = language || "it"; // default to Italian if language is undefined

  return (
    <div className="whoWe-root">
      <Header language={language} setLanguage={setLanguage} />
      <Nav current="about-who" Language={currentLanguage} />
      <div className="whoWe-container">
        <div className="content-box">
          <h1>{content[currentLanguage].title}</h1>
          <p>{content[currentLanguage].paragraph1}</p>
          <p>{content[currentLanguage].paragraph2}</p>
          <p>{content[currentLanguage].paragraph3}</p>

          <div className="list-box">
            <h1>{content[currentLanguage].missionsTitle}:</h1>
            <ul>
              <li>
                <h2>{content[currentLanguage].mission1Title}</h2>
                <h3>{content[currentLanguage].mission1Subtitle}</h3>
              </li>
              {/* <img src={online0} alt="Online" /> */}
              <img src={online} alt="Online" />
              <li>
                <h2>{content[currentLanguage].mission2Title}</h2>
              </li>
              <img src={roma} alt="Roma" />
              {/* <img src={roma1} alt="Roma" /> */}
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/DjMeq9Hr_-A?start=459"
                  allowfullscreen
                  title="YouTube video player"
                  frameborder="0"
                ></iframe>
              </div>
              <li>
                <h2>{content[currentLanguage].mission3Title}</h2>
              </li>
              <img src={padova} alt="Padova" />
              {/* <img src={padova1} alt="Padova" /> */}
            </ul>
          </div>
          <Link className="link" to="/contact">
            {content[currentLanguage].contactLink}
          </Link>

          <CitBox
            text={content[currentLanguage].citation1Text}
            reference={content[currentLanguage].citation1Reference}
          />
          <CitBox
            text={content[currentLanguage].citation2Text}
            reference={content[currentLanguage].citation2Reference}
          />
        </div>
      </div>
      <Footer Language={currentLanguage} />
    </div>
  );
}

export default WhoWe_page;
