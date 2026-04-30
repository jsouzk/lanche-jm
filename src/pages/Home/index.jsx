import { Link } from "react-router-dom";
import "./styles.css";

import xquarteirao from "../Home/ImagensHome/xquarteirao.jpg";
import batatasfritas from "../Home/ImagensHome/batatasfritas.jpg";
import pizza from "../Home/ImagensHome/pizza.jpg";

const destaques = [
  {
    img: xquarteirao,
    alt: "x-quarteirao",
    titulo: "X-Quarteirão",
    descricao: "Pão macio, carne suculenta e queijo cheddar derretido.",
  },
  {
    img: batatasfritas,
    alt: "batata frita",
    titulo: "Batata Frita",
    descricao: "Crocante por fora e macia por dentro.",
  },
  {
    img: pizza,
    alt: "pizza",
    titulo: "Pizzas",
    descricao: "Pizza com massa crocante, molho saboroso e queijo derretido.",
  },
];

function Home() {
  return (
    <main className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-eyebrow">Lago do Limão</span>

          <h1>
            O melhor lanche da <em>comunidade</em>
          </h1>

          <p>
            Sabor, qualidade e rapidez. Experimente o melhor do Lanche J.M!
          </p>

          <div className="hero-actions">
            <Link to="/cardapio" className="btn primary">
              Ver Cardápio
            </Link>
            <Link to="/sobre" className="btn outline">
              Nossa história
            </Link>
          </div>
        </div>
      </section>

      {/* ── DESTAQUES ── */}
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
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section className="sobre">
        <div className="sobre-container">
          <div className="sobre-text">
            <span className="section-eyebrow" style={{ color: "rgba(245,240,232,0.5)" }}>
              Quem somos
            </span>
            <h2>Sobre o Lanche J.M</h2>
            <p>
              Somos apaixonados por oferecer lanches de qualidade com um
              atendimento rápido e eficiente. Nosso objetivo é garantir a
              melhor experiência para você!
            </p>
            <Link to="/sobre" className="btn highlight">
              Conheça nossa história
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="cta-container">
          <h2>Ficou com fome?</h2>
          <p>Peça agora mesmo pelo nosso cardápio!</p>
          <Link to="/cardapio" className="btn highlight">
            Fazer Pedido
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;
