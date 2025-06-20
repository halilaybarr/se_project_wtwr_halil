import { useEffect, useState } from "react";

import { getWeather, filterWeather } from "../../utils/weatherApi";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, apiKey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActivemodal] = useState("");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [selectedCard, setSelectedCard] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActivemodal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActivemodal("add-garment");
  };

  const closeActiveModal = () => {
    setActivemodal("");
  };

  const handleAddItemSubmit = (name, imageUrl, weather) => {
    setClothingItems((prevItems) => [
      { name, link: imageUrl, weather, _id: Date.now() },
      ...prevItems,
    ]);
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeather(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          closeActiveModal={closeActiveModal}
          onAddItemSubmit={handleAddItemSubmit}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
