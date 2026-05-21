import { Link } from "react-router-dom";
import { FaGithub, FaMapMarkerAlt, FaMotorcycle, FaRegClock, FaWhatsapp } from "react-icons/fa";

import { locaisEntrega, storeConfig } from "../../config/store";
import { formatCurrency } from "../../utils/formatCurrency";
import { getStoreStatus } from "../../utils/storeStatus";
import Julio from "../../images/julio.jpeg";
import pizzaHero from "../Home/ImagensHome/pizza.jpg";

import "./styles.css";

const pilares = [
  {
    numero: "1",
    titulo: "Missão",
    texto: "Servir lanches saborosos com qualidade, agilidade e cuidado em cada pedido.",
  },
  {
    numero: "2",
    titulo: "Visão",
    texto: "Ser referência em lanches na região pelo atendimento, sabor e preço justo.",
  },
  {
    numero: "3",
    titulo: "Valores",
    texto: "Qualidade, compromisso, respeito ao cliente e paixão genuína pelo que fazemos.",
  },
];

const passosPedido = [
  "Escolha seus favoritos no cardápio.",
  "Adicione os itens ao carrinho.",
  "Informe entrega, pagamento e observações.",
  "Finalize pelo WhatsApp.",
];

function Sobre() {
  const status = getStoreStatus(storeConfig.schedule);

  return (
    <main className="sobre-page">
      <section className="sobre-hero">
        <img src={pizzaHero} alt="" className="sobre-hero-bg" />
        <div className="sobre-hero-content">
          <span className="hero-eyebrow">Nossa história</span>
          <h1>
            Sobre o <em>Lanche J.M</em>
          </h1>
          <p>
            Uma lanchonete da comunidade, feita para servir comida gostosa, preço justo e atendimento próximo no Lago do Limão.
          </p>

          <div className={`sobre-status ${status.isOpen ? "open" : "closed"}`}>
            <strong>{status.label}</strong>
            <span>{status.detail}</span>
          </div>
        </div>
      </section>

      <section className="sobre-info">
        <article>
          <FaMapMarkerAlt aria-hidden="true" />
          <h2>Onde atendemos</h2>
          <p>Lago do Limão e regiões próximas, com entrega ou retirada no local.</p>
        </article>
        <article>
          <FaRegClock aria-hidden="true" />
          <h2>Horário</h2>
          <p>{status.detail}</p>
        </article>
        <article>
          <FaMotorcycle aria-hidden="true" />
          <h2>Pedido fácil</h2>
          <p>Monte seu carrinho online e envie tudo pronto pelo WhatsApp.</p>
        </article>
      </section>

      <section className="sobre-section">
        <div className="container">
          <span className="section-label">Desde o início</span>
          <h2>Nossa História</h2>
          <p>
            A Lanche J.M nasceu com o objetivo de oferecer lanches de qualidade, sabor marcante e atendimento rápido. Cada pedido é preparado com cuidado para chegar quente, bem montado e do jeito que o cliente pediu.
          </p>
        </div>
      </section>

      <section className="sobre-cards">
        <div className="cards-header">
          <span className="section-label">Nossos pilares</span>
          <h2>O que nos move</h2>
        </div>

        <div className="cards-grid">
          {pilares.map((pilar) => (
            <div className="card" key={pilar.titulo}>
              <div className="card-icon">{pilar.numero}</div>
              <h3>{pilar.titulo}</h3>
              <p>{pilar.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sobre-section dark">
        <div className="container">
          <span className="section-label">Como pedir</span>
          <h2>Seu pedido em poucos passos</h2>
          <ol className="steps-list">
            {passosPedido.map((passo) => (
              <li key={passo}>{passo}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sobre-section">
        <div className="container">
          <span className="section-label">Entregas</span>
          <h2>Áreas e taxas</h2>
          <ul className="delivery-list">
            {locaisEntrega.map((local) => (
              <li key={local.value}>
                <span>{local.label}</span>
                <strong>{formatCurrency(local.taxa)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sobre-section dark">
        <div className="container">
          <span className="section-label">Por que escolher a gente?</span>
          <h2>Nossos diferenciais</h2>
          <ul className="diferenciais-list">
            <li>Ingredientes frescos e selecionados</li>
            <li>Atendimento rápido e simpático</li>
            <li>Pedido fácil pelo cardápio online</li>
            <li>Preço justo e acessível</li>
          </ul>
        </div>
      </section>

      <section className="sobre-cta">
        <h2>Ficou com fome?</h2>
        <p>Escolha seus favoritos e finalize o pedido pelo WhatsApp.</p>
        <div className="sobre-actions">
          <Link to="/cardapio" className="btn-sobre primary">Ver cardápio</Link>
          <Link to="/carrinho" className="btn-sobre outline">
            <FaWhatsapp aria-hidden="true" />
            Ir para o carrinho
          </Link>
        </div>
      </section>

      <section className="dev-section">
        <span className="section-label">Tecnologia</span>
        <h2>Desenvolvimento do sistema</h2>

        <div className="dev-card">
          <div className="dev-img-wrapper">
            <img src={Julio} alt="Foto do desenvolvedor Julio Souza" className="dev-img" />
          </div>

          <h3>Júlio Souza</h3>
          <p className="dev-role">Fullstack Developer</p>
          <p className="dev-email">juliodesouzaif@gmail.com</p>

          <div className="dev-links">
            <a href="https://github.com/jsouzk" target="_blank" rel="noreferrer" className="github-link">
              <FaGithub />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sobre;
