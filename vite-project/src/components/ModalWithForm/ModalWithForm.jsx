import "./ModalWithForm.css";
import closeBtn from "../../assets/close-btn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  closeActiveModal,
  isOpen = false,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal-form__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          {closeBtn && <img src={closeBtn} alt="Close" />}
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
