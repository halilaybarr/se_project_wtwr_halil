import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  handleAddClick,
  clothingItems,
  onDeleteItem,
  onUpdateUser,
  onSignOut,
  setActiveModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onDeleteItem={onDeleteItem}
        />
      </section>
      <div>
        <button onClick={() => setActiveModal("edit-profile")}>
          Edit profile
        </button>
        {/* Remove EditProfileModal from here! */}
        <button onClick={onSignOut}>Sign out</button>
      </div>
    </div>
  );
}

export default Profile;
