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
import Confirmation from "../Confirmation/Confirmation.jsx";

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

  const handleDeleteItem = async (id) => {
    try {
      await deleteItems(id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = async (name, imageUrl, weather) => {
    try {
      const newItem = await addItem(name, imageUrl, weather);
      console.log("API returned new item:", newItem);
      setClothingItems((prevItems) => [newItem, ...prevItems]);
    } catch (error) {
      console.error(error);
    } finally {
      closeActiveModal();
    }
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
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  onDeleteItem={handleDeleteItem}
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
          onDeleteItem={handleDeleteItem}
          setActiveModal={setActivemodal}
        />
        <Confirmation
          isOpen={activeModal === "confirmation"}
          onDeleteItem={handleDeleteItem}
          closeActiveModal={closeActiveModal}
          card={selectedCard}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
