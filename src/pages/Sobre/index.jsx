import { FaGithub } from "react-icons/fa";
import { FaReact } from "react-icons/fa";

import "./../Sobre/styles.css";

import Julio from "./../../images/julio.jpeg";

function Sobre() {
  return (
    <main className="sobre-page">
      {/* HERO */}
      <section className="sobre-hero">
        <h1>Sobre o Lanche J.M</h1>
        <p>Conheça nossa história e o que nos torna especiais</p>
      </section>

      {/* HISTÓRIA */}
      <section className="sobre-section">
        <div className="container">
          <h2>Nossa História</h2>
          <p>
            A Lanche J.M nasceu com o objetivo de oferecer lanches de qualidade,
            com sabor marcante e atendimento rápido. Desde o início, buscamos
            trabalhar com ingredientes selecionados e um preparo cuidadoso para
            garantir a melhor experiência aos nossos clientes.
          </p>
        </div>
      </section>

      {/* MISSÃO VISÃO VALORES */}
      <section className="sobre-cards">
        <div className="card">
          <h3>Missão</h3>
          <p>
            Proporcionar lanches saborosos com qualidade e rapidez, garantindo a
            satisfação dos nossos clientes.
          </p>
        </div>

        <div className="card">
          <h3>Visão</h3>
          <p>
            Ser referência em lanches na região, reconhecida pela excelência e
            atendimento.
          </p>
        </div>

        <div className="card">
          <h3>Valores</h3>
          <p>
            Qualidade, compromisso, respeito ao cliente e paixão pelo que
            fazemos.
          </p>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="sobre-section dark">
        <div className="container">
          <h2>Por que escolher a gente?</h2>
          <ul>
            <li> • Ingredientes frescos e selecionados</li>
            <li> • Atendimento rápido</li>
            <li> • Ambiente agradável</li>
            <li> • Preço justo</li>
          </ul>
        </div>
      </section>
      {/* DESENVOLVEDOR */}
      <section className="dev-section">
        <h2>Desenvolvedor Fullstack</h2>

        <div className="dev-card">
          <img
            src={ Julio }
            alt="Foto do desenvolvedor"
            className="dev-img"
          />

          <h3>Julio Souza</h3>
          <p className="dev-email">juliodesouzaif@gmail.com</p>

          <a
            href="https://github.com/jsouzk"
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            <FaGithub />
          </a>
        </div>
      </section>
    </main>
  );
}

export default Sobre;
