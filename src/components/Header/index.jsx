import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./styles.css";
import Logo from "./../../images/Logotipo.png";

const links = [
  { to: "/",         label: "Home"     },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/sobre",    label: "Sobre"    },
  { to: "/carrinho", label: "Carrinho", destaque: true },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  /* bloqueia scroll quando o menu mobile abre */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* fecha o menu ao mudar de rota */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <Link to="/" className="logo-area">
          <img src={Logo} className="logo" alt="Logotipo Lanche J.M" />
          <h1>Lanche <span>J.M</span></h1>
        </Link>

        {/* HAMBÚRGUER */}
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* NAV */}
        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          {links.map(({ to, label, destaque }) => (
            <Link
              key={to}
              to={to}
              className={destaque ? "nav-carrinho" : ""}
              aria-current={location.pathname === to ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}

export default Header;
