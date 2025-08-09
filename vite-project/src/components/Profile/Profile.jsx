import { useState, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
        {}
        <button onClick={() => setIsEditOpen(true)}>Edit profile</button>
        <EditProfileModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onUpdate={onUpdateUser}
          currentUser={currentUser}
        />
        <button onClick={onSignOut}>Sign out</button>
      </div>
    </div>
  );
}

export default Profile;
