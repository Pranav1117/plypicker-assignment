import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for your navbar styling

const Navbar = () => {
  const { email, role } = useSelector((state) => state.user);
  return (
    <div className="navbar-container">
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
    </div>
  );
};

export default Navbar;
