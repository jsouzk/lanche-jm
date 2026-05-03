import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHome, FaInfoCircle, FaShoppingCart, FaUtensils } from "react-icons/fa";

import "./styles.css";
import Logo from "./../../images/Logotipo.png";

const links = [
  { to: "/", label: "Home", icon: FaHome },
  { to: "/cardapio", label: "Cardápio", icon: FaUtensils },
  { to: "/sobre", label: "Sobre", icon: FaInfoCircle },
  { to: "/carrinho", label: "Carrinho", icon: FaShoppingCart, destaque: true },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-area" aria-label="Ir para a página inicial">
          <span className="logo-frame">
            <img src={Logo} className="logo" alt="Logotipo Lanche J.M" />
          </span>
          <span className="brand-copy">
            <h1>
              Lanche <span>J.M</span>
            </h1>
          </span>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-navigation" className={`nav ${menuOpen ? "active" : ""}`}>
          {links.map(({ to, label, icon: Icon, destaque }) => (
            <Link
              key={to}
              to={to}
              className={destaque ? "nav-carrinho" : ""}
              aria-current={location.pathname === to ? "page" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
