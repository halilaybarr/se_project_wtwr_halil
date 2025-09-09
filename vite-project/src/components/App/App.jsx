import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";
import CurrentUserContext from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Confirmation from "../Confirmation/Confirmation.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ClothesSection from "../ClothesSection/ClothesSection";
import { getWeather, filterWeather } from "../../utils/weatherApi";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import { getItems, deleteItems, addItem, updateUser } from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";
import { addCardLike, removeCardLike } from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal.jsx";

function App() {
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);

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

  // Universal function for handling submit requests
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeather(data);
        setWeatherData(filteredData);
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
          // Fetch items with token after user is authenticated
          return getItems(token);
        })
        .then((data) => {
          setClothingItems(data);
        })
        .catch((err) => {
          console.error(err);
          setIsLoggedIn(false);
          setCurrentUser(null);
          // Still fetch items without token if auth fails
          getItems()
            .then((data) => {
              setClothingItems(data);
            })
            .catch(console.error);
        });
    } else {
      // Fetch items without token if no user is logged in
      getItems()
        .then((data) => {
          setClothingItems(data);
        })
        .catch(console.error);
    }
  }, []);

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return deleteItems(id, token).then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      });
    };
    handleSubmit(makeRequest);
  };

  const handleAddItem = (name, imageUrl, weather) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return addItem({ name, imageUrl, weather }, token).then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      await register({ name, avatar, email, password });
      const data = await login({ email, password });
      localStorage.setItem("jwt", data.token);
      setIsLoggedIn(true);
      closeActiveModal();
      const userData = await checkToken(data.token);
      setCurrentUser(userData);
      // Refresh items with user context
      const items = await getItems(data.token);
      setClothingItems(items);
    } catch (err) {
      console.error(err);
      throw err; // Re-throw to allow RegisterModal to handle the error
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await login({ email, password });
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        const userData = await checkToken(res.token);
        setCurrentUser(userData);
        // Refresh items with user context
        const items = await getItems(res.token);
        setClothingItems(items);
        navigate("/profile");
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return updateUser({ name, avatar }, token).then(setCurrentUser);
    };
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const likeAction = !isLiked ? addCardLike : removeCardLike;
    likeAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            item._id === id
              ? {
                  ...updatedCard,
                  owner:
                    typeof updatedCard.owner === "string"
                      ? { _id: updatedCard.owner }
                      : updatedCard.owner,
                }
              : item
          )
        );
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    closeActiveModal();
    // Refresh items without authentication after signing out
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              setActiveModal={setActiveModal}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      onDeleteItem={handleDeleteItem}
                      onUpdateUser={handleUpdateUser}
                      onSignOut={handleSignOut}
                      setActiveModal={setActiveModal}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            name="add-garment"
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            handleAddItem={handleAddItem}
            isLoading={isLoading}
          />
          <ItemModal
            name="preview"
            isOpen={activeModal === "preview"}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            onDeleteItem={handleDeleteItem}
            setActiveModal={setActiveModal}
          />
          <Confirmation
            name="confirmation"
            isOpen={activeModal === "confirmation"}
            onDeleteItem={handleDeleteItem}
            closeActiveModal={closeActiveModal}
            card={selectedCard}
          />
          <RegisterModal
            name="register"
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            openLogin={() => setActiveModal("login")}
            isLoading={isLoading}
          />
          <LoginModal
            name="login"
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            openSignUp={() => setActiveModal("register")}
            isLoading={isLoading}
          />
          <EditProfileModal
            name="edit-profile"
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdate={handleUpdateUser}
            isLoading={isLoading}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
