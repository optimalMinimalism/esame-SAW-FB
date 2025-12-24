import "./singleSermon_styles.scss";

import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Nav from "../../../../components/nav/Nav";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

import { formatTimestamp } from "../../../../utils/timeStamp";

import bookLoading from "../../../../assets/bookLoading.gif";

function SingleSermon_page({ language, setLanguage }) {
  //* routing
  const { id } = useParams();

  //* state
  const [sermon, setSermon] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //* translations
  const translations = {
    en: {
      notFound: "Sermon not found.",
      loading: "Loading sermon...",
      datePrefix: "Date: ",
      sermonLink: "Text link",
    },
    it: {
      notFound: "Sermone non trovato.",
      loading: "Caricamento sermone...",
      datePrefix: "Data: ",
      sermonLink: "Link del testo",
    },
  };

  const t = translations[language];

  //* fetch single sermon by id
  useEffect(() => {
    async function fetchSermon() {
      try {
        const ref = doc(db, "sermons", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setSermon(snap.data());
        }
      } catch (error) {
        console.error("Error fetching sermon:", error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchSermon();
  }, [id]);

  //* not found
  if (!isFetching && !sermon) {
    return (
      <div className="sermon-root">
        <Header language={language} setLanguage={setLanguage} />
        <Nav current="sermon" Language={language} />
        <h1 style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
          {t.notFound}
        </h1>
        <Footer Language={language} />
      </div>
    );
  }

  //* loading
  if (isFetching) {
    return (
      <div className="sermon-root">
        <Header language={language} setLanguage={setLanguage} />
        <Nav current="sermon" Language={language} />
        <div className="loading-spinner">
          <img
            src={bookLoading}
            alt="Loading"
            style={{ width: "45px", height: "45px" }}
          />
          <p>{t.loading}</p>
        </div>
        <Footer Language={language} />
      </div>
    );
  }

  //* embed urls
  const embedUrlDoc = sermon.docUrl?.replace("/edit", "/embed") + "?rm=minimal";

  const embedUrlVideo = sermon.videoUrl?.replace("watch?v=", "embed/");

  const isValidGoogleDocs = sermon.docUrl?.includes("docs.google.com/document");

  return (
    <div className="sermon-root">
      <Header language={language} setLanguage={setLanguage} />
      <Nav current="sermon" Language={language} />

      <div className="sermon-container">
        <div className="content-box">
          {isValidGoogleDocs ? (
            <>
              <h1>{sermon.title}</h1>

              <h2>
                {t.datePrefix}
                {formatTimestamp(
                  sermon.date,
                  language === "it" ? "it-IT" : "en-GB"
                )}
              </h2>

              <a href={sermon.docUrl} className="sermon-link">
                {t.sermonLink}
              </a>

              <iframe
                className="iframe-doc"
                src={embedUrlDoc}
                width="100%"
                height="600px"
                style={{ border: "none", maxWidth: "100%" }}
                allowFullScreen
                title={sermon.title}
              />

              {embedUrlVideo && (
                <div className="video-container">
                  <iframe
                    className="iframe-video"
                    src={embedUrlVideo}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </>
          ) : (
            <p>{t.notFound}</p>
          )}
        </div>
      </div>

      <Footer Language={language} />
    </div>
  );
}

export default SingleSermon_page;
