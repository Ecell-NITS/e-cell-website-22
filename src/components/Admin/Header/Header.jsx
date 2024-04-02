import { Link } from "react-router-dom";
import "./Header.scss";

const HeaderAdmin = () => {
  return (
    <div className="header-admin">
      <h1>
        {" "}
        <Link to="/admin"> Admin Panel </Link>{" "}
      </h1>
    </div>
  );
};

export default HeaderAdmin;
