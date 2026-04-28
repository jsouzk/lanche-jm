import { Link } from "react-router-dom";
import "../Home/styles.css";

import xquarteirao from "../Home/images/xquarteirao.jpg";
import xtudo from "../Home/images/xtudo artesanal.jpg";
import refri from "../../images/refri.jpg";

function Home() {
  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-text">
            <h1>O melhor lanche da comunidade do Lago do Limão</h1>
            <p>
              Sabor, qualidade e rapidez. Experimente o melhor do Lanche J.M!
            </p>

            <div className="hero-actions">
              <Link to="/cardapio" className="btn primary">
                Ver Cardápio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="destaques">
        <div className="cards">
          <article className="card">
            <img src={xquarteirao} alt="X - Quarteirão" />
            <span className="img-aviso">Imagem meramente ilustrativa</span>

            <div className="card-content">
              <h3>X - Quarteirão</h3>
              <p>Pão macio, carne suculenta e queijo derretido.</p>
            </div>
          </article>

          <article className="card">
            <img src={xtudo} alt="X-Tudo com carne artesanal" />
            <span className="img-aviso">Imagem meramente ilustrativa</span>

            <div className="card-content">
              <h3>Batata Frita</h3>
              <p>Crocante por fora e macia por dentro.</p>
            </div>
          </article>

          <article className="card">
            <img src={refri} alt="Refrigerantes" />
            <span className="img-aviso">Imagem meramente ilustrativa</span>

            <div className="card-content">
              <h3>Refrigerantes</h3>
              <p>Bebidas geladas para acompanhar seu lanche.</p>
            </div>
          </article>
        </div>
      </section>

      {/* SOBRE */}
      <section className="sobre">
        <div className="container sobre-container">
          <div className="sobre-text">
            <h2>Sobre o Lanche J.M</h2>
            <p>
              Somos apaixonados por oferecer lanches de qualidade com um
              atendimento rápido e eficiente. Nosso objetivo é garantir a melhor
              experiência para você!
            </p>

            <Link to="/sobre" className="btn primary">
              Conheça nossa história
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta">
        <div className="container cta-container">
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
