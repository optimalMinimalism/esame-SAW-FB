import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import "./Nav_styles.scss";
import { useNavigate } from "react-router-dom";

function Nav({ current = "home", Language }) {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/about");
  };
  const goToWho = () => {
    navigate("/who");
  };
  const goToSermons = () => {
    navigate("/sermons");
  };
  const goToContact = () => {
    navigate("/contact");
  };
  const goToEvents = () => {
    navigate("/events");
  };

  const isEnglish = Language === "en";

  // home is the default
  // in home all the buttons are turned off
  if (
    current !== "home" &&
    current !== "about-who" &&
    current !== "about-what" &&
    current !== "sermon" &&
    current !== "contact" &&
    current !== "events"
  ) {
    throw new Error("Invalid value for 'current'");
  }
  return (
    <>
      <nav>
        {/*
        https://szhsin.github.io/react-menu/
        */}
        <Menu
          className={"about-menu"}
          align={"center"}
          position={"auto"}
          viewScroll={"close"}
          gap={1}
          menuButton={
            <MenuButton
              className={"nav-button"}
              style={{
                backgroundColor:
                  current === "about-who" || current === "about-what"
                    ? "#A1CCA5"
                    : "transparent",
                color:
                  current === "about-who" || current === "about-what"
                    ? "black"
                    : "white",
              }}
            >
              {!isEnglish ? "La Nostra Chiesa" : "Our Church"}
            </MenuButton>
          }
          transition
        >
          <MenuItem
            onClick={goToWho}
            className={"about-button"}
            style={{
              backgroundColor: current === "about-who" ? "#A1CCA5" : "white",
              color: "black",
            }}
          >
            {!isEnglish ? "Chi siamo" : "Who we are"}
          </MenuItem>
          <MenuItem
            onClick={goToAbout}
            className={"about-button"}
            style={{
              backgroundColor: current === "about-what" ? "#A1CCA5" : "white",
              color: "black",
            }}
          >
            {!isEnglish ? "Cosa crediamo" : "What we believe"}
          </MenuItem>
        </Menu>
        <button
          onClick={goToSermons}
          style={{
            backgroundColor: current === "sermon" ? "#A1CCA5" : "transparent",
            color: current === "sermon" ? "black" : "white",
          }}
          className="nav-button"
        >
          {!isEnglish ? "Sermoni" : "Sermons"}
        </button>
        <button
          onClick={goToContact}
          style={{
            backgroundColor: current === "contact" ? "#A1CCA5" : "transparent",
            color: current === "contact" ? "black" : "white",
          }}
          className="nav-button"
        >
          {!isEnglish ? "Contattaci" : "Contact us"}
        </button>
        <button
          onClick={goToEvents}
          style={{
            backgroundColor: current === "events" ? "#A1CCA5" : "transparent",
            color: current === "events" ? "black" : "white",
          }}
          className="nav-button"
        >
          {!isEnglish ? "Eventi" : "Events"}
        </button>
      </nav>
    </>
  );
}

export default Nav;
