import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = currentUser
    ? clothingItems.filter(
        (item) =>
          item.owner &&
          ((typeof item.owner === "string" && item.owner === currentUser._id) ||
            (typeof item.owner === "object" &&
              item.owner._id === currentUser._id))
      )
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          className="clothes-section__add-btn"
          onClick={props.handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={() => props.onCardClick(item)}
            onCardLike={props.onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
