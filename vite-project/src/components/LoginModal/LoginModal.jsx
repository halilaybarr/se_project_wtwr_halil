import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, openSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password })
      .then(() => onClose())
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
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="modal__input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="error">{error}</div>}

      <div className="modal__button-row">
        <button
          type="submit"
          className={`modal__submit${
            email && password ? " modal__submit_active" : ""
          }`}
          disabled={!(email && password)}
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
