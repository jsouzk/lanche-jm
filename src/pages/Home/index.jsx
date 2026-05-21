import { Link } from "react-router-dom";
import { FaClock, FaMotorcycle, FaShoppingCart, FaWhatsapp } from "react-icons/fa";

import { locaisEntrega, storeConfig } from "../../config/store";
import { useCart } from "../../context/cartContextValue";
import { formatCurrency } from "../../utils/formatCurrency";
import { getStoreStatus } from "../../utils/storeStatus";

import batatasfritas from "./ImagensHome/batatasfritas.jpg";
import pizza from "./ImagensHome/pizza.jpg";
import xquarteirao from "./ImagensHome/xquarteirao.jpg";

import "./styles.css";

const destaques = [
  {
    img: xquarteirao,
    alt: "X-Quarteirão",
    titulo: "X-Quarteirão",
    descricao: "Pão macio, carne suculenta e queijo cheddar derretido.",
  },
  {
    img: batatasfritas,
    alt: "Batata frita",
    titulo: "Batata frita",
    descricao: "Crocante por fora, macia por dentro e pronta para dividir.",
  },
  {
    img: pizza,
    alt: "Pizza",
    titulo: "Pizzas",
    descricao: "Massa crocante, molho saboroso e queijo derretido.",
  },
];

const combos = [
  {
    titulo: "Combo de Pizza Família",
    preco: 60,
    descricao: "Pizza família, refrigerante tradicional de 2 L e porção de batata.",
  },
  {
    titulo: "Combo Trio Tentação",
    preco: 78,
    descricao: "2 pizzas grandes, refrigerante de 2 L e batata frita.",
  },
  {
    titulo: "Combo 1 de X-Salada",
    preco: 25,
    descricao: "2 X-Saladas, refrigerante Baré de 1 L e batata frita.",
  },
];

const passos = [
  "Escolha no cardápio",
  "Adicione ao carrinho",
  "Informe entrega e pagamento",
  "Envie pelo WhatsApp",
];

function Home() {
  const { cart } = useCart();
  const status = getStoreStatus(storeConfig.schedule);
  const totalItens = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCarrinho = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);
  const areasEntrega = locaisEntrega.map((local) => local.label.split(" - ")[0]).join(", ");

  return (
    <main className="home">
      <section className="hero">
        <img src={xquarteirao} alt="" className="hero-bg" />
        <div className="hero-text">
          <span className="hero-eyebrow">Lago do Limão</span>

          <h1>
            Lanche quente, bonito e feito <em>no capricho</em>
          </h1>

          <p>
            Hambúrgueres, pizzas, pastéis, combos e bebidas com pedido fácil pelo WhatsApp.
          </p>

          <div className={`home-status ${status.isOpen ? "open" : "closed"}`}>
            <strong>{status.label}</strong>
            <span>{status.detail}</span>
          </div>

          {totalItens > 0 && (
            <Link to="/carrinho" className="cart-summary">
              <FaShoppingCart aria-hidden="true" />
              <span>{totalItens} item(ns) no carrinho</span>
              <strong>{formatCurrency(totalCarrinho)}</strong>
            </Link>
          )}

          <div className="hero-actions">
            <Link to="/cardapio" className="btn primary">
              Ver cardápio
            </Link>
            <Link to="/carrinho" className="btn outline">
              Ir para o carrinho
            </Link>
          </div>
        </div>
      </section>

      <section className="quick-info">
        <article>
          <FaClock aria-hidden="true" />
          <h2>Funcionamento</h2>
          <p>{status.detail}</p>
        </article>
        <article>
          <FaMotorcycle aria-hidden="true" />
          <h2>Entrega e retirada</h2>
          <p>Atendemos {areasEntrega}.</p>
        </article>
        <article>
          <FaWhatsapp aria-hidden="true" />
          <h2>Pedido pelo WhatsApp</h2>
          <p>Monte o carrinho e envie o pedido já organizado.</p>
        </article>
      </section>

      <section className="destaques">
        <div className="destaques-header">
          <span className="section-eyebrow">Nossos favoritos</span>
          <h2>O que não pode faltar</h2>
        </div>

        <div className="cards">
          {destaques.map((item) => (
            <article key={item.titulo} className="card">
              <img src={item.img} alt={item.alt} />
              <span className="img-aviso">Imagem meramente ilustrativa</span>
              <div className="card-content">
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
                <Link to="/cardapio" className="card-link">Pedir agora</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="combos-home">
        <div className="combos-container">
          <span className="section-eyebrow">Combos fortes</span>
          <h2>Pedidos que resolvem a fome</h2>
          <div className="combo-grid">
            {combos.map((combo) => (
              <article key={combo.titulo} className="combo-card">
                <h3>{combo.titulo}</h3>
                <p>{combo.descricao}</p>
                <strong>{formatCurrency(combo.preco)}</strong>
              </article>
            ))}
          </div>
          <Link to="/cardapio" className="btn primary">Ver todos os combos</Link>
        </div>
      </section>

      <section className="como-pedir">
        <div className="como-container">
          <span className="section-eyebrow">Como pedir</span>
          <h2>Do cardápio ao WhatsApp</h2>
          <ol className="steps">
            {passos.map((passo) => (
              <li key={passo}>{passo}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sobre">
        <div className="sobre-container">
          <div className="sobre-text">
            <span className="section-eyebrow">Quem somos</span>
            <h2>Sobre o Lanche J.M</h2>
            <p>
              Uma lanchonete da comunidade, feita para servir comida gostosa, preço justo e um atendimento que facilita seu pedido.
            </p>
            <Link to="/sobre" className="btn highlight">
              Conheça nossa história
            </Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-container">
          <h2>Monte seu pedido agora</h2>
          <p>Escolha seus favoritos, confira o total e finalize pelo WhatsApp.</p>
          <div className="cta-actions">
            <Link to="/cardapio" className="btn highlight">
              Ver cardápio
            </Link>
            <Link to="/carrinho" className="btn outline light">
              Ir para o carrinho
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
