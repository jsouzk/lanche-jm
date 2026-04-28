import "./../Footer/styles.css";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © 2026 Lanche J.M. - Todos os direitos reservados
        </p>

        <div className="socials">
          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/_.lanche.jm/"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <FaInstagram className="icon" />
            <span>Instagram</span>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/5592984525890?text=Olá,%20gostaria%20de%20fazer%20um%20pedido!"
            target="_blank"
            rel="noreferrer"
            className="social-link whatsapp"
          >
            <FaWhatsapp className="icon" />
            <span>Pedir pelo WhatsApp</span>
          </a>

          {/* MAPS */}
          <a
            href="https://maps.app.goo.gl/nCecd1X9Cof7u9dn7"
            target="_blank"
            rel="noreferrer"
            className="social-link maps"
          >
            <FaMapMarkerAlt className="icon" />
            <span>Ver localização</span>
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
