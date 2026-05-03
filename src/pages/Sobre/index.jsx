import { FaGithub } from "react-icons/fa";
import Julio from "./../../images/julio.jpeg";
import "./../Sobre/styles.css";

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

function Sobre() {
  return (
    <main className="sobre-page">
      <section className="sobre-hero">
        <span className="hero-eyebrow">Nossa história</span>
        <h1>
          Sobre o <em>Lanche J.M</em>
        </h1>
        <p>
          Conheça a história por trás de cada mordida e o cuidado que faz o pedido chegar gostoso.
        </p>
      </section>

      <section className="sobre-section">
        <div className="container">
          <span className="section-label">Desde o início</span>
          <h2>Nossa História</h2>
          <p>
            A Lanche J.M nasceu com o objetivo de oferecer lanches de qualidade, sabor marcante e atendimento rápido. Trabalhamos com preparo cuidadoso para garantir uma experiência simples, gostosa e confiável.
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
