import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister }) {
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
      onClose();
      resetForm();
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      buttonText="Register"
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
      <input
        className="modal__input"
        type="text"
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <input
        className="modal__input"
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        value={values.avatar}
        onChange={handleChange}
        required
      />
      {error && <div className="error">{error}</div>}
    </ModalWithForm>
  );
}

export default RegisterModal;
