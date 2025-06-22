import "./Confirmation.css";
import closeBtn from "../../assets/close-btn.svg";

function Confirmation({ onDeleteItem, closeActiveModal, card, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="confirmation">
        <button
          onClick={closeActiveModal}
          type="button"
          className="confirmation__close"
        >
          <img src={closeBtn} alt="Close" />
        </button>
        <p className="confirmation__text">
          Are you sure you want to delete this item?
        </p>
        <p>This action is irreversible.</p>
        <div className="confirmation__btns">
          <button
            type="button"
            className="confirmation__btn confirmation__btn_type_confirm"
            onClick={() => {
              onDeleteItem(card._id);
              closeActiveModal();
            }}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="confirmation__btn confirmation__btn_type_cancel"
            onClick={closeActiveModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
