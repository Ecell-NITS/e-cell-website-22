import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const handleClient = () => {
    // window.location.href = "/dashboard";
    navigate("/dashboard");
  };
  return (
    <div className="sidebar-admin">
      <div className="logo">
        <img
          src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341163/Ecell%20website/ecell-logo-bw2_sayvqp.webp"
          alt="e-cell logo"
        />
      </div>
      <div className="sidebar-admin-links">
        <NavLink to="/admin/messages">Messages</NavLink>
        <NavLink to="/admin/events">Events</NavLink>
        <NavLink to="/admin/add-events">Add Events</NavLink>
        <NavLink to="/admin/blogs">Blogs</NavLink>
        <NavLink to="/admin/add-blogs">Add Blogs</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
      </div>
      <button onClick={handleClient}>Client Site</button>
      <div className="menu"></div>
    </div>
  );
};

export default SidebarAdmin;
