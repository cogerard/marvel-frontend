import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="central-header-container">
        <div className="header-side-menu">
          <Link to={`/`}>
            <button className="header-button">CHARACTERS</button>
          </Link>
          <Link to={`/comics`}>
            <button className="header-button">COMICS</button>
          </Link>
        </div>
        <Link to={`/`}>
          <div>
            <img
              className="header-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1920px-Marvel_Logo.svg.png"
              alt="logo-marvel"
            />
          </div>
        </Link>
        <div className="header-side-menu">
          <Link to={`/favorites`}>
            <button className="header-button button-favorites">
              MY FAVORITES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
