import "../App.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="central-footer-container">
        <div className="text">
          <span>Made at </span>
          <Link to={"https://www.lereacteur.io/"}>Le Reacteur</Link>
          <span> by </span>
          <Link to={"https://github.com/cogerard/"}>Corentin Gerard</Link>
          <span> - 2023</span>
        </div>
        {/* <img
          className="header-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1920px-Marvel_Logo.svg.png"
          alt="logo-marvel"
        /> */}
      </div>
    </div>
  );
};

export default Footer;
