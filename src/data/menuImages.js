import pizzaImg from "../pages/Home/ImagensHome/pizza.jpg";
import xQuarteiraoImg from "../pages/Home/ImagensHome/xquarteirao.jpg";
import batataImg from "../pages/Home/ImagensHome/batatasfritas.jpg";
import burguerImg from "../images/xburguer.jpg";
import refriImg from "../images/refri.jpg";

const byCategory = {
  "Mais pedidos": xQuarteiraoImg,
  "Pizzas Grandes": pizzaImg,
  "Pizza Família": pizzaImg,
  "Pizzas Médias": pizzaImg,
  "Combos de Pizzas": pizzaImg,
  "Sanduíches": burguerImg,
  "Combos de Sanduíches": burguerImg,
  Refrigerantes: refriImg,
  "Porções de Batata": batataImg,
};

const byProductId = {
  39: burguerImg,
  47: pizzaImg,
  57: pizzaImg,
  98: batataImg,
  99: batataImg,
  100: batataImg,
  103: pizzaImg,
  104: xQuarteiraoImg,
  106: pizzaImg,
};

export const withMenuImages = (menu) =>
  menu.map((secao) => ({
    ...secao,
    image: byCategory[secao.categoria],
    produtos: secao.produtos.map((produto) => ({
      ...produto,
      image: byProductId[produto.id] || byCategory[secao.categoria],
    })),
  }));
