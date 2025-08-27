import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister, openLogin, isLoading }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRegister({
        email: values.email,
        password: values.password,
        name: values.name,
        avatar: values.avatar,
      });
      resetForm();
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          id="register-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="register-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          id="register-name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      {error && <div className="error">{error}</div>}

      <div className="modal__button-row">
        <button
          type="submit"
          className={`modal__submit${
            values.email && values.password && values.name && values.avatar
              ? " modal__submit_active"
              : ""
          }`}
          disabled={
            !(
              values.email &&
              values.password &&
              values.name &&
              values.avatar
            ) || isLoading
          }
        >
          {isLoading ? "Registering..." : "Sign Up"}
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-signup"
          onClick={openLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
