import { Link, useHistory } from "react-router-dom";
import CartLogo from "../Cart/CartLogo";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";

const Header = () => {
  const { role } = useSelector((store) => store.signInStore);
  const history = useHistory();

  const profileHandler = () => {
    history.push("/profile");
  };
  const logoClickHandler = () => {
    history.push("/");
  };

  return (
    <header>
      <h1 onClick={logoClickHandler} className="logo">
        ITStore
      </h1>
      <div className="optional">
        <SearchBar />
      </div>
      <nav className="optional">
        <ul className="nav_links">
          <li>
            <Link to="/products" className="navbtn">
              Sale!
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbtn">
              Contact
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link to="/dashboard" className="navbtn">
                DashBoard
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="cartLogo">
        <CartLogo />
        <div className="optional2">
          {role ? (
            <button className="profile" onClick={profileHandler}>
              Profile
            </button>
          ) : (
            <div className="signinoption">
              <Link to="/signin" className="signin">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
