import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import RequireAuth from "./guards/requireAuth";

//* public pages
import Home from "./pages/public/home/home_page";
import About from "./pages/public/aboutUs/about/about_page";
import Who from "./pages/public/aboutUs/whoWe_page/whoWe_page";
import Sermons from "./pages/public/sermons/sermons/sermons_page";
import SingleSermon from "./pages/public/sermons/singleSermon/singleSermon_page";
import Events from "./pages/public/aboutUs/events/events_page";
import Contact from "./pages/public/contact/contact_page";

//* auth
import Login from "./pages/auth/login_page";

//* admin
import Admin from "./pages/admin/admin_page";
import CreateSermon from "./pages/admin/create/create_sermon";
import CreateEvent from "./pages/admin/create/create_event";
import AdminMessages from "./pages/admin/messages/admin_messages";

const LANGUAGE_STORAGE_KEY = "user_language";

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "it";
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  return (
    <Routes>
      {/* //* public routes */}
      <Route
        path="/"
        element={<Home language={language} setLanguage={setLanguage} />}
      />
      <Route
        path="/about"
        element={<About language={language} setLanguage={setLanguage} />}
      />
      <Route
        path="/who"
        element={<Who language={language} setLanguage={setLanguage} />}
      />
      <Route
        path="/sermons"
        element={<Sermons language={language} setLanguage={setLanguage} />}
      />
      <Route
        path="/sermon/:id"
        element={<SingleSermon language={language} setLanguage={setLanguage} />}
      />
      <Route
        path="/events"
        element={<Events language={language} setLanguage={setLanguage} />}
      />
      <Route
        path="/contact"
        element={<Contact language={language} setLanguage={setLanguage} />}
      />
      {/* //* auth */}
      <Route
        path="/login"
        element={<Login language={language} setLanguage={setLanguage} />}
      />

      {/* //* admin (protected) */}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <Admin language={language} setLanguage={setLanguage} />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/create-sermon"
        element={
          <RequireAuth>
            <CreateSermon language={language} setLanguage={setLanguage} />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/create-event"
        element={
          <RequireAuth>
            <CreateEvent language={language} setLanguage={setLanguage} />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <RequireAuth>
            <AdminMessages language={language} setLanguage={setLanguage} />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
