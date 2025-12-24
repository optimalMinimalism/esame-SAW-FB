import "./sermons_styles.scss";

import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Nav from "../../../../components/nav/Nav";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "../../../../firebase";
import { formatTimestamp } from "../../../../utils/timeStamp";

import bookLoading from "../../../../assets/bookLoading.gif";

const Sermons_page = ({ language, setLanguage }) => {
  //* Translations

  const translations = {
    en: {
      title: "Sermons",
      loading: "Loading sermons...",
      noSermons: "No sermons available",
    },
    it: {
      title: "Sermoni",
      loading: "Caricamento sermoni...",
      noSermons: "Nessun sermone disponibile",
    },
  };

  const t = translations[language];

  //* State

  const [sermons, setSermons] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const sermonsPerPage = 10;

  //* Fetch sermons from Firestore

  useEffect(() => {
    async function fetchSermons() {
      try {
        const q = query(collection(db, "sermons"), orderBy("date", "desc"));

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSermons(data);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchSermons();
  }, []);

  //* Pagination logic

  const totalPages = Math.ceil(sermons.length / sermonsPerPage);
  const startIndex = currentPage * sermonsPerPage;

  const visibleSermons = sermons.slice(startIndex, startIndex + sermonsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  //* Render

  return (
    <div className="sermons-root">
      <Header language={language} setLanguage={setLanguage} />
      <Nav current="sermon" Language={language} />

      <div className="sermons-container">
        <div className="content-box">
          <h1>{t.title}</h1>

          {isFetching ? (
            <div className="loading-spinner">
              <img
                src={bookLoading}
                alt="Loading"
                style={{ width: "45px", height: "45px" }}
              />
              <p>{t.loading}</p>
            </div>
          ) : (
            <>
              <ul className="sermon-list">
                {visibleSermons.length > 0 ? (
                  visibleSermons.map((sermon) => (
                    <li key={sermon.id}>
                      <Link to={`/sermon/${sermon.id}`} className="sermon-link">
                        <h2>
                          {sermon.title} -{" "}
                          {formatTimestamp(
                            sermon.date,
                            language === "it" ? "it-IT" : "en-GB"
                          )}
                        </h2>
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>{t.noSermons}</p>
                )}
              </ul>

              {sermons.length > sermonsPerPage && (
                <div className="carousel-controls">
                  <button onClick={handlePrev} disabled={currentPage === 0}>
                    ◀
                  </button>

                  <span>
                    {currentPage + 1} / {totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                  >
                    ▶
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer Language={language} />
    </div>
  );
};

export default Sermons_page;
