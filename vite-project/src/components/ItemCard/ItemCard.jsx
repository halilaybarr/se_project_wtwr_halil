import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import likeButtonIcon from "../../assets/likebutton.svg";
import likeButtonLikedIcon from "../../assets/likebutton-liked.svg";

function ItemCard({ item, onCardLike, onCardClick, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    Array.isArray(item.likes) && currentUser
      ? item.likes.some((like) =>
          typeof like === "object"
            ? like._id === currentUser._id
            : like === currentUser._id
        )
      : false;

  const handleLike = () => {
    if (typeof onCardLike === "function") {
      onCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
      {currentUser && (
        <button className="card__like-btn" onClick={handleLike}>
          <img
            src={isLiked ? likeButtonLikedIcon : likeButtonIcon}
            alt="like button"
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
