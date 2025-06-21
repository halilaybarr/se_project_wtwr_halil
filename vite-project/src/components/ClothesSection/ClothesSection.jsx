import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { getItems } from "../../utils/api";
import { useEffect, useState } from "react";

function ClothesSection({ onCardClick, handleAddClick }) {
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__add-btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={() => onCardClick(item)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
