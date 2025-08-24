import "./ItemModal.css";
import closeBtn from "../../assets/close-btn.svg";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({
  activeModal,
  closeActiveModal,
  card,
  isOpen,
  onDeleteItem,
  setActiveModal,
  ...props
}) {
  const currentUser = useContext(CurrentUserContext);
  // Check if user owns the item - handle both string and object owner formats
  const isOwn =
    card?.owner && currentUser
      ? typeof card.owner === "string"
        ? card.owner === currentUser._id
        : card.owner._id === currentUser._id
      : false;

  const handleDeleteClick = () => {
    setActiveModal("confirmation");
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeBtn} alt="Close" />
        </button>
        {card && card.imageUrl && (
          <img
            src={card.imageUrl}
            alt={card.name || "item"}
            className="modal__image"
          />
        )}
        <div className="modal__footer">
          <h2 className="modal__caption">{card?.name}</h2>
          <p className="modal__weather">Weather: {card?.weather}</p>
          {isOwn && (
            <button className="modal__delete-btn" onClick={handleDeleteClick}>
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
