import "./styles.css";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const socials = [
  {
    href: "https://www.instagram.com/_.lanche.jm/",
    label: "Instagram",
    icon: <FaInstagram className="icon" />,
    className: "social-link",
  },
  {
    href: "https://wa.me/5592984525890?text=Olá,%20gostaria%20de%20fazer%20um%20pedido!",
    label: "Pedir pelo WhatsApp",
    icon: <FaWhatsapp className="icon" />,
    className: "social-link whatsapp",
  },
  {
    href: "https://maps.app.goo.gl/nCecd1X9Cof7u9dn7",
    label: "Ver localização",
    icon: <FaMapMarkerAlt className="icon" />,
    className: "social-link",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOPO */}
        <div className="footer-top">
          <div className="footer-brand">
            <h2>Lanche <span>J.M</span></h2>
            <p>Lago do Limão — Iranduba, AM</p>
            <p>Horário de Funcionamento: 18:00 até 23:00, de terça a domingo</p>
          </div>

          <div className="socials">
            {socials.map(({ href, label, icon, className }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {icon}
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p className="footer-text">
            © {new Date().getFullYear()} Lanche J.M — Todos os direitos reservados
          </p>
          <p className="footer-credit">
            Desenvolvido por{" "}
            <a href="https://github.com/jsouzk" target="_blank" rel="noreferrer">
              Julio Souza
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
