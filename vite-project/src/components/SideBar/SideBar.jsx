import { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/user-img.svg";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="User Avatar"
        />
      ) : (
        <div className="sidebar__avatar-placeholder">
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
      )}
      <p className="sidebar__username">{currentUser?.name}</p>
    </div>
  );
}

export default SideBar;
