import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <Link to={`/`}>
        <div>
          <img
            className="header-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1920px-Marvel_Logo.svg.png"
            alt="logo-vinted"
          />
        </div>
      </Link>
      <div className="header-menu">
        <Link to={`/`}>
          <button className="header-button">Characters</button>
        </Link>
        <Link to={`/comics`}>
          <button className="header-button">Comics</button>
        </Link>
        <Link to={`/favorites`}>
          <button className="header-button button-favorites">Favorites</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
