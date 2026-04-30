import { FaGithub } from "react-icons/fa";
import "./../Sobre/styles.css";
import Julio from "./../../images/julio.jpeg";

function Sobre() {
  return (
    <main className="sobre-page">

      {/* ── HERO ── */}
      <section className="sobre-hero">
        <span className="hero-eyebrow">Nossa história</span>
        <h1>
          Sobre o <em>Lanche J.M</em>
        </h1>
        <p>
          Conheça a história por trás de cada mordida e o que nos torna
          especiais desde o primeiro dia.
        </p>
        <div className="hero-line" />
      </section>

      {/* ── HISTÓRIA ── */}
      <section className="sobre-section">
        <div className="container">
          <span className="section-label">Desde o início</span>
          <h2>Nossa História</h2>
          <p>
            A Lanche J.M nasceu com o objetivo de oferecer lanches de qualidade,
            com sabor marcante e atendimento rápido. Desde o início, buscamos
            trabalhar com ingredientes selecionados e um preparo cuidadoso para
            garantir a melhor experiência aos nossos clientes.
          </p>
        </div>
      </section>

      {/* ── MISSÃO / VISÃO / VALORES ── */}
      <section className="sobre-cards">
        <div className="cards-header">
          <span className="section-label">Nossos pilares</span>
          <h2>O que nos move</h2>
        </div>

        <div className="cards-grid">
          <div className="card">
            <div className="card-icon">1</div>
            <h3>Missão</h3>
            <p>
              Proporcionar lanches saborosos com qualidade e rapidez, garantindo
              a satisfação dos nossos clientes em cada visita.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">2</div>
            <h3>Visão</h3>
            <p>
              Ser referência em lanches na região, reconhecida pela excelência,
              inovação e atendimento de primeira.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">3</div>
            <h3>Valores</h3>
            <p>
              Qualidade, compromisso, respeito ao cliente e paixão genuína por
              tudo que fazemos.
            </p>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="sobre-section dark">
        <div className="container">
          <span className="section-label">Por que escolher a gente?</span>
          <h2>Nossos diferenciais</h2>
          <ul className="diferenciais-list">
            <li>Ingredientes frescos e selecionados</li>
            <li>Atendimento rápido e simpático</li>
            <li>Ambiente agradável</li>
            <li>Preço justo e acessível</li>
          </ul>
        </div>
      </section>

      {/* ── DESENVOLVEDOR ── */}
      <section className="dev-section">
        <span className="section-label">Por trás da tecnologia</span>
        <h2>Desenvolvedor Fullstack</h2>

        <div className="dev-card">
          <div className="dev-img-wrapper">
            <img src={Julio} alt="Foto do desenvolvedor Julio Souza" className="dev-img" />
          </div>

          <h3>Júlio Souza</h3>
          <p className="dev-role">Fullstack Developer</p>
          <p className="dev-email">juliodesouzaif@gmail.com</p>

          <div className="dev-links">
            <a
              href="https://github.com/jsouzk"
              target="_blank"
              rel="noreferrer"
              className="github-link"
            >
              <FaGithub />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="sobre-footer">
        © {new Date().getFullYear()} <span>Lanche J.M</span> — Todos os direitos reservados
      </footer>

    </main>
  );
}

export default Sobre;
