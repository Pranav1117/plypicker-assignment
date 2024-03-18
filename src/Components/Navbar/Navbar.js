import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
const Navbar = () => {
  const { email, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("ply-token");
    navigate("/");
  };
  return (
    <div className="navbar-container">
      <div className="logo">E-Mart</div>
      <div className="navlink-wrapper">
        <Link to="/profile" className="navbar-link">
          Profile
        </Link>
        {role === "team member" ? (
          <Link to="/profile/my-submissions" className="navbar-link">
            My Submissions
          </Link>
        ) : (
          ""
        )}
        {role === "admin" && (
          <Link to="/pending-requests" className="navbar-link">
            Pending Requests
          </Link>
        )}
        <Link to={`/dashboard/${role}`} className="navbar-link">
          Dashboard
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
