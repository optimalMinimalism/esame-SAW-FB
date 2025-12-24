import "./login_styles.scss";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Login_page({ language, setLanguage }) {
  //* translations
  const translations = {
    en: {
      title: "Login",
      email: "Email",
      password: "Password",
      button: "Login",
      error: "Invalid credentials",
    },
    it: {
      title: "Accesso",
      email: "Email",
      password: "Password",
      button: "Accedi",
      error: "Credenziali non valide",
    },
  };

  const t = translations[language];

  //* state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch {
      setError(t.error);
    }
  }

  return (
    <div className="login-root">
      <Header language={language} setLanguage={setLanguage} />

      <div className="login-container">
        <div className="content-box">
          <h1>{t.title}</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email}
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.password}
              required
            />

            <button type="submit">{t.button}</button>

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>

      <Footer Language={language} />
    </div>
  );
}

export default Login_page;
