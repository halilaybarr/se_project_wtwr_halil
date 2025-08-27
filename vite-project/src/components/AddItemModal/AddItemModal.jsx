import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({
  isOpen,
  closeActiveModal,
  handleAddItem,
  isLoading,
}) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weatherType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem(values.name, values.imageUrl, values.weatherType);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="add-item-name"
          name="name"
          required
          minLength="1"
          maxLength="30"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label className="modal__label">
        Link{" "}
        <input
          type="url"
          className="modal__input"
          id="add-item-imageUrl"
          name="imageUrl"
          required
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Weather Type</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            id="add-item-hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="add-item-warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="add-item-cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
