import "./ItemCard.css";

function ItemCard({ item, onCardLike, onCardClick, ...props }) {
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
