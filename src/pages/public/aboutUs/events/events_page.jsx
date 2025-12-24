import "./events_styles.scss";

import Header from "../../../../components/header/Header.jsx";
import Nav from "../../../../components/nav/Nav.jsx";
import Footer from "../../../../components/footer/Footer.jsx";

import { useEffect, useState } from "react";

import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "../../../../firebase.js";
import { formatTimestamp } from "../../../../utils/timeStamp";

import bookLoading from "../../../../assets/bookLoading.gif";

function Events_page({ language, setLanguage }) {
  //* translations
  const translations = {
    en: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      loading: "Loading Events...",
    },
    it: {
      months: [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ],
      loading: "Caricamento Eventi...",
    },
  };

  const t = translations[language];

  //* state
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  //* fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = query(collection(db, "events"), orderBy("date", "asc"));

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchEvents();
  }, []);

  //* group events by month
  function renderChurchEvents(data) {
    let lastMonthIndex = null;

    return data.map((event) => {
      const jsDate = event.date.toDate();
      const monthIndex = jsDate.getMonth();
      const year = jsDate.getFullYear();

      const monthHeader =
        monthIndex !== lastMonthIndex ? (
          <li key={`month-${year}-${monthIndex}`} className="month">
            <h1>
              {t.months[monthIndex]} {year}
            </h1>
          </li>
        ) : null;

      lastMonthIndex = monthIndex;

      return (
        <div key={event.id}>
          {monthHeader}
          <li className="event">
            <p>
              {event.name} –{" "}
              {formatTimestamp(
                event.date,
                language === "it" ? "it-IT" : "en-GB"
              )}
            </p>
          </li>
        </div>
      );
    });
  }

  return (
    <div className="events-root">
      <Header language={language} setLanguage={setLanguage} />
      <Nav current="events" Language={language} />

      <div className="events-container">
        <div className="background-box">
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
            <ul>{renderChurchEvents(events)}</ul>
          )}
        </div>
      </div>

      <Footer Language={language} />
    </div>
  );
}

export default Events_page;
