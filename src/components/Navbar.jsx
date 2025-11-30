import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-brand">AlphaEdge Portfolio</div>
      <nav className="navbar-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/portfolio" className="nav-link">
          Portfolio
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
