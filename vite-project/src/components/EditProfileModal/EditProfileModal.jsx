import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onUpdate, currentUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, avatar });
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Change profile data"
      buttonText="Save changes"
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      className="edit-profile_label"
    >
      <input
        className="modal__input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="modal__input"  
        type="url"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
