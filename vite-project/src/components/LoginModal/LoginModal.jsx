import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin }) {
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
      buttonText="Login"
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="error">{error}</div>}
    </ModalWithForm>
  );
}

export default LoginModal;
