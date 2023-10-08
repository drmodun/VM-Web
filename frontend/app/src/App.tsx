import { Router } from "./Components/Router";
import "./assets/fonts/stylesheet.css";

function App() {
  if (window.location.search === "?option=com_content&task=view&id=2") {
    window.location.href = "https://www.microline.hr/EUWeb/StartEU.ashx";
  }

  if (window.location.search === "?option=com_contact&Itemid=3") {
    window.location.href = "/";
  }

  if (
    window.location.search === "?option=com_content&task=view&id=1&Itemid=3"
  ) {
    window.location.href = "/#/services";
  }

  return <Router />;
}

export default App;
