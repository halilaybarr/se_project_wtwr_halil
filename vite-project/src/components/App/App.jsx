// React and library imports
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./App.css";

// Context
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Confirmation from "../Confirmation/Confirmation.jsx";

// Utils and constants
import { getWeather, filterWeather } from "../../utils/weatherApi";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import { getItems, deleteItems, addItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [selectedCard, setSelectedCard] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
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
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddItem = (name, imageUrl, weather) => {
    addItem(name, imageUrl, weather)
      .then((newItem) => {
        console.log("API returned new item:", newItem);
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeActiveModal();
      });
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
          setActiveModal={setActiveModal}
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
