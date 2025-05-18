import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  FaShoppingCart, 
  FaSearch, 
  FaHeart, 
  FaBell, 
  FaSignOutAlt,
  FaUserCog,
  FaCog,
  FaBolt  // Added for logo icon
} from "react-icons/fa";
import { useCart } from "../pages/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const { cartCount, user } = useCart();

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth");
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isHidden ? "hidden" : ""}`}>
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo">
            {isMobile ? (
              <FaBolt className="logo-icon" onClick={() => navigate('/')} />
            ) : (
              "Mithun Electricals"
            )}
          </div>
          
          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <ul>
              {[
                { to: "/", text: "Home" },
                { to: "/products", text: "Products" },
                { to: "/contact", text: "Contact Us" },
                ...(user?.role === "admin" ? [{ to: "/admin/dashboard", text: "Admin" }] : []),
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.to} onClick={() => setIsMenuOpen(false)}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="nav-center">
          <form className="search-container" onSubmit={handleSearch} ref={searchRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="nav-right">
          <div className="nav-icons">
            {user && (
              <>
                <Link to="/wishlist" className="icon-link">
                  <FaHeart className="nav-icon" />
                  <span className="icon-text">Wishlist</span>
                </Link>
                <Link to="/notifications" className="icon-link">
                  <FaBell className="nav-icon" />
                  <span className="icon-text">Notifications</span>
                </Link>
                <Link to="/cart" className="icon-link cart-icon">
                  <FaShoppingCart className="nav-icon" />
                  <span className="icon-text">Cart</span>
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              </>
            )}

            {user ? (
              <div className="profile-icon" ref={profileRef}>
                <FaCog
                  className="profile-icon-img"
                  onClick={toggleProfile}
                />
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-details">
                      <h3>Account Settings</h3>
                      <p className="user-email">{user.email}</p>
                      <div className="profile-actions">
                        <Link to="/profile" className="profile-link" onClick={() => setIsProfileOpen(false)}>
                          <FaUserCog className="profile-action-icon" />
                          <span>Profile Settings</span>
                        </Link>
                        <button className="logout-btn" onClick={handleLogout}>
                          <FaSignOutAlt className="profile-action-icon" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="auth-link login-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? "change" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "change" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "change" : ""}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;