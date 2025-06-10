import { useEffect, useState } from "react";

import { getWeather, filterWeather } from "../../utils/weatherApi";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, apiKey } from "../../utils/constants";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActivemodal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="text"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input id="hot" type="radio" className="modal__radio-input" />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" type="radio" className="modal__radio-input" />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" type="radio" className="modal__radio-input" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
      <Footer />
    </div>
  );
}

export default App;
