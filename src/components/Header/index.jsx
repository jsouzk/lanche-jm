import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "../Header/styles.css";
import Logo from "./../../images/Logotipo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔒 BLOQUEIA SCROLL QUANDO MENU ABRE
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <div className="logo-area">
          <img src={Logo} className="logo" alt="logotipo da lanchonete" />
          <h1>Lanche J.M</h1>
        </div>

        {/* BOTÃO MENU */}
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* NAV */}
        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/cardapio" onClick={() => setMenuOpen(false)}>Cardápio</Link>
          <Link to="/carrinho" onClick={() => setMenuOpen(false)}>Carrinho</Link>
          <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
        </nav>

      </div>
    </header>
  );
}

export default Header;