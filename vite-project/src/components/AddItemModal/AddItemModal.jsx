import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({
  isOpen,
  closeActiveModal,
  handleAddItem,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherTypeChange = (e) => setWeatherType(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem(name, imageUrl, weatherType);
  };

  // Reset form fields when the modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          required
          minLength="1"
          maxLength="30"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="link" className="modal__label">
        Link{" "}
        <input
          type="url"
          className="modal__input"
          id="link"
          required
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <label htmlFor="weather" className="modal__label">
        Weather Type{" "}
        <select
          id="weather"
          className="modal__input"
          onChange={handleWeatherTypeChange}
          value={weatherType}
        >
          <option value="" disabled>
            Select weather type
          </option>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>
      </label>
    </ModalWithForm>
  );
}
