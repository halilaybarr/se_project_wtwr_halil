import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import { Modal } from "../Modal/Modal";

function ItemModal({
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
    <Modal name="preview" onClose={closeActiveModal} isOpen={isOpen}>
      <div className="modal__content_type_image">
        {card && (card.imageUrl || card.link) && (
          <img
            src={card.imageUrl || card.link}
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
    </Modal>
  );
}

export default ItemModal;
