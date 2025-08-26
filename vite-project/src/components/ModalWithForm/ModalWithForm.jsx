import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

function ModalWithForm({
  children,
  buttonText,
  title,
  closeActiveModal,
  isOpen = false,
  onSubmit,
  name = "form",
}) {
  return (
    <Modal name={name} onClose={closeActiveModal} isOpen={isOpen}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} className="modal__form">
        {children}
        {buttonText && (
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        )}
      </form>
    </Modal>
  );
}

export default ModalWithForm;
