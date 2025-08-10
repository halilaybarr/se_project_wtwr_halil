// React and library imports
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./App.css";

// Context
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";
import CurrentUserContext from "../../context/CurrentUserContext";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Confirmation from "../Confirmation/Confirmation.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";

// Utils and constants
import { getWeather, filterWeather } from "../../utils/weatherApi";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import { getItems, deleteItems, addItem, updateUser } from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth"; // adjust path as needed
import { addCardLike, removeCardLike } from "../../utils/api";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItems(id, token)
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
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeActiveModal();
      });
  };

  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      await register({ name, avatar, email, password });

      const data = await login({ email, password });
      localStorage.setItem("jwt", data.token);
      setIsLoggedIn(true);
      setActiveModal("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await login({ email, password });
      if (res.token) {
        localStorage.setItem("jwt", res.token);

        setIsLoggedIn(true);

        // Fetch and set the current user
        const user = await checkToken(res.token);
        setCurrentUser(user);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUser({ name, avatar }, token)
      .then((updatedUser) => setCurrentUser(updatedUser))
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const likeAction = !isLiked ? addCardLike : removeCardLike;
    likeAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveModal(""); 
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onDeleteItem={handleDeleteItem}
                      onUpdateUser={handleUpdateUser}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
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
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={() => setActiveModal("")}
            onRegister={handleRegister}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
