import { Link } from "react-router-dom";
import "./styles.css";

import batatasfritas from "../Home/ImagensHome/batatasfritas.jpg";
import pizza from "../Home/ImagensHome/pizza.jpg";
import xquarteirao from "../Home/ImagensHome/xquarteirao.jpg";

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

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <span className="hero-eyebrow">Lago do Limão</span>

          <h1>
            Lanche bonito, quente e feito <em>no capricho</em>
          </h1>

          <p>
            Hambúrgueres, Pizzas, Pastéis, Combos e Bebidas com atendimento rápido para matar a fome sem enrolação.
          </p>

          <div className="hero-actions">
            <Link to="/cardapio" className="btn primary">
              Ver Cardápio
            </Link>
            <Link to="/carrinho" className="btn outline">
              Ir para o carrinho
            </Link>
          </div>
        </div>
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
              </div>
            </article>
          ))}
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
          <h2>Ficou com fome?</h2>
          <p>Escolha seus favoritos e finalize o pedido pelo WhatsApp.</p>
          <Link to="/cardapio" className="btn highlight">
            Fazer pedido
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
