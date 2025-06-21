import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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
import Profile from "../Profile/Profile";
import { getItems, deleteItems, addItem } from "../../utils/api";

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

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeather(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleDeleteItem = (id) => {
    deleteItems(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .catch(console.error);
  };

  const handleAddItem = (name, link, weather) => {
    addItem(name, link, weather)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      })
      .catch(console.error);
    closeActiveModal();
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onDeleteItem={handleDeleteItem}
                  onAddItem={handleAddItem}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  
                />
              }
            ></Route>
          </Routes>
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          closeActiveModal={closeActiveModal}
          handleAddItem={handleAddItem}
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
