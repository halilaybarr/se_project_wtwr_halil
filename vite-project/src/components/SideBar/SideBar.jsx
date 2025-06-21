import "./SideBar.css";
import avatar from "../../assets/user-img.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="User Avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
