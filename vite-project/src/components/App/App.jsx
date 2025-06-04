import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";

function App() {
  const [weather, setWeather] = useState();

  return (
    <div className="page">
      <div className="page__content">
        <Header weather={setWeather} />
      </div>
    </div>
  );
}

export default App;
