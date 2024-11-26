import { Link } from "react-router-dom";
import "./navbar.css"; // Optional for styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbarList">
        <li className="navbarItem">
          <Link to="/">Home</Link>
        </li>
        <li className="navbarItem">
          <Link to="/login">Login</Link>
        </li>
        <li className="navbarItem">
          <Link to="/register">Register</Link>
        </li>
        <li className="navbarItem">
          <Link to="/profilepage">Profile Page</Link>
        </li>
        <li className="navbarItem">
          <Link to="/createpost">Post Creation</Link>
        </li>
        <li className="navbarItem">
          <Link to="/displaypost">Post Display</Link>
        </li>
      </ul>
    </nav>
  );
}
