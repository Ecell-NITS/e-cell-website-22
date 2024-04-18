// import { Route, Router, Routes } from "react-router";
import { Route, Routes, useNavigate } from "react-router";
import HeaderAdmin from "../../../components/Admin/Header/Header";
import SidebarAdmin from "../../../components/Admin/Sidebar/Sidebar";
import "./index.scss";
import Messages from "./Messages/Messages";
import EventsAdmin from "./Events/Events";
import Users from "./Users/Users";
import AddEventsAdmin from "./AddEvents/AddEvents";
import BlogsAdmin from "./Blogs/Blogs";
import AddBlogsAdmin from "./AddBlogs/AddBlogs";
import { Helmet } from "react-helmet";
import IndiMsg from "./Messages/IndividualMessages/IndiMsg";
import BlogReview from "./Blogs/BlogReview/BlogReview";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  const [admin, setAdmin] = useState(false);
  const [superadmin, setSuperadmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/dashboard`, config)
      .then(async (response) => {
        setLoading(false);
        const { role } = await response.data;
        setAdmin(role === "admin" || role === "superadmin");
        setSuperadmin(role === "superadmin");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        } else if (error.response.data.error === "Invalid token") {
          localStorage.removeItem("token");
          toast.error("Session Expired! Please Login Again");
          navigate("/login");
        } else {
          console.error("Failed to retrieve user details", error);
        }
      });
  }, [navigate]);

  if (!admin) {
    navigate("/login");
  }
  if (loading) {
    return <h1>We are checking your profile</h1>;
  }
  return (
    <>
      {" "}
      {loading ? (
        <h1>We are checking your profile</h1>
      ) : !admin ? (
        <h1>You are not authorized</h1>
      ) : (
        <div className="admin">
          <div className="main">
            <HeaderAdmin />
            <Helmet>
              <title>{`Admin | E-CELL NIT Silchar`}</title>
              <meta name="description" content="E-CELL NIT SILCHAR" />
            </Helmet>
            <Routes>
              <Route path="/" element={<AdminLanding />} />
              <Route path="messages" element={<Messages />} />
              <Route path="events" element={<EventsAdmin />} />
              <Route path="add-events" element={<AddEventsAdmin />} />
              <Route path="blogs" element={<BlogsAdmin />} />
              <Route path="add-blogs" element={<AddBlogsAdmin />} />
              <Route path="users" element={<Users />} />
              <Route path="messages/:id" element={<IndiMsg />} />
              <Route path="blogs/review/:id" element={<BlogReview />} />
            </Routes>
          </div>
          {/* <div className="main"></div> */}
          <div className="sidebar">
            <SidebarAdmin isSuperAdmin={superadmin} />
          </div>
        </div>
      )}
    </>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
    </Routes>
  );
};

const AdminLanding = () => {
  const navigate = useNavigate();
  const handleClient = () => {
    // window.location.href = "/dashboard";
    navigate("/dashboard");
  };
  return (
    <div className="admin-landing">
      <h2>Welcome to the Admin Panel! This is where you can manage the website.</h2>
      <p>You can navigate the Admin panel using the sidebar </p>
      <p>You can go back to Client side by clicking the button below:</p>
      <button onClick={handleClient}>Client Site</button>
    </div>
  );
};

export default Admin;
