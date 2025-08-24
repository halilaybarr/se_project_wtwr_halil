import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onLogin, openSignUp }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email: values.email, password: values.password })
      .then(() => {
        onClose();
        resetForm();
      })
      .catch((err) => setError(err.message || String(err)));
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="modal__input"
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <input
        className="modal__input"
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        required
      />
      {error && <div className="error">{error}</div>}

      <div className="modal__button-row">
        <button
          type="submit"
          className={`modal__submit${
            values.email && values.password ? " modal__submit_active" : ""
          }`}
          disabled={!(values.email && values.password)}
        >
          Login
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-signup"
          onClick={openSignUp}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
