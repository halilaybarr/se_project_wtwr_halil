import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemCard({ item, onCardLike, onCardClick, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes.includes(currentUser?._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button onClick={handleLike}>
        {isLiked ? "Unlike" : "Like"}
      </button>
    </li>
  );
}

export default ItemCard;
