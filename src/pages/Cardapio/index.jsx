import "../../pages/Cardapio/styles.css";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

import xburguer from "../../images/xburguer.jpg";
import batata from "../../images/batata.jpg";
import refri from "../../images/refri.jpg";

const cardapio = [
  {
    categoria: "Pizzas Grandes",
    produtos: [
      {
        id: 1,
        nome: "Portuguesa (Grande)",
        preco: 37,
        descricao:
          "Molho de tomate, queijo mussarela, ovos, azeitona, verduras e orégano",
        imagem: xburguer,
      },
      {
        id: 2,
        nome: "Bacon (Grande)",
        preco: 37,
        descricao: "Molho de tomate, queijo, bacon, azeitona, cebola e orégano",
        imagem: batata,
      },
      {
        id: 3,
        nome: "Calabresa (Grande)",
        preco: 35,
        descricao:
          "Molho de tomate, queijo mussarela, calabresa, azeitona, orégano e cebola",
        imagem: batata,
      },
      {
        id: 4,
        nome: "Baiana (Grande)",
        preco: 35,
        descricao:
          "Molho de tomate, queijo mussarela, calabresa, azeitona, orégano e cebola",
        imagem: batata,
      },
      {
        id: 5,
        nome: "Milho com Catupiry (Grande)",
        preco: 35,
        descricao:
          "Molho de tomate, queijo mussarela, presunto de peru, azeitona, catupiry e orégano",
        imagem: batata,
      },
      {
        id: 6,
        nome: "Mussarela Crocante (Grande)",
        preco: 35,
        descricao: "Molho de tomate, queijo mussarela, batata palha e orégano",
        imagem: batata,
      },
      {
        id: 7,
        nome: "Duetos (Grande)",
        preco: 34,
        descricao:
          "Molho de tomate, queijo mussarela, seleta, milho verde, orégano e azeitona",
        imagem: batata,
      },
      {
        id: 8,
        nome: "Dois Queijos (Grande)",
        preco: 34,
        descricao:
          "Molho de tomate, queijo mussarela, queijo cheddar e orégano",
        imagem: batata,
      },
      {
        id: 9,
        nome: "Mussarela (Grande)",
        preco: 34,
        descricao: "Molho de tomate, queijo mussarela, verduras e orégano",
        imagem: batata,
      },
      {
        id: 10,
        nome: "Bauru (Grande)",
        preco: 34,
        descricao:
          "Molho de tomate, queijo mussarela, presunto de peru, orégano e azeitona",
        imagem: batata,
      },
      {
        id: 11,
        nome: "Marguerita (Grande)",
        preco: 32,
        descricao:
          "Molho de tomate, queijo mussarela, manjericão, tomate e orégano",
        imagem: batata,
      },
      {
        id: 12,
        nome: "Chocolate com Banana (Grande)",
        preco: 42,
        descricao: "Queijo mussarela, banana e chocolate 50%",
        imagem: batata,
      },
      {
        id: 13,
        nome: "Chocolate (Grande)",
        preco: 40,
        descricao: "Queijo mussarela e chocolate 50%",
        imagem: batata,
      },
    ],
  },
  {
    categoria: "Pizzas Médias",
    produtos: [
      {
        id: 14,
        nome: "Portuguesa (Média)",
        preco: 25,
        descricao:
          "Molho de tomate, queijo mussarela, ovos, azeitona, verduras e orégano",
        imagem: xburguer,
      },
      {
        id: 15,
        nome: "Bacon (Média)",
        preco: 25,
        descricao: "Molho de tomate, queijo, bacon, azeitona, cebola e orégano",
        imagem: batata,
      },
      {
        id: 16,
        nome: "Calabresa (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, calabresa, azeitona, orégano e cebola",
        imagem: batata,
      },
      {
        id: 17,
        nome: "Baiana (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, calabresa, azeitona, orégano e cebola",
        imagem: batata,
      },
      {
        id: 18,
        nome: "Milho com Catupiry (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, presunto de peru, azeitona, catupiry e orégano",
        imagem: batata,
      },
      {
        id: 19,
        nome: "Mussarela Crocante (Média)",
        preco: 23,
        descricao: "Molho de tomate, queijo mussarela, batata palha e orégano",
        imagem: batata,
      },
      {
        id: 20,
        nome: "Duetos (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, seleta, milho verde, orégano e azeitona",
        imagem: batata,
      },
      {
        id: 21,
        nome: "Dois queijos (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, queijo cheddar e orégano",
        imagem: batata,
      },
      {
        id: 22,
        nome: "Mussarela (Média)",
        preco: 22,
        descricao: "Molho de tomate, queijo mussarela, verduras e orégano",
        imagem: batata,
      },
      {
        id: 23,
        nome: "Bauru (Média)",
        preco: 22,
        descricao:
          "Molho de tomate, queijo mussarela, presunto de peru, orégano e azeitona",
        imagem: batata,
      },
      {
        id: 24,
        nome: "Marguerita (Média)",
        preco: 22,
        descricao:
          "Molho de tomate, queijo mussarela, manjericão, tomate e orégano",
        imagem: batata,
      },
      {
        id: 25,
        nome: "Chocolate com Banana (Média)",
        preco: 32,
        descricao: "Queijo mussarela, banana e chocolate 50%",
        imagem: batata,
      },
      {
        id: 26,
        nome: "Chocolate (Média)",
        preco: 30,
        descricao: "Queijo mussarela e chocolate 50%",
        imagem: batata,
      },
    ],
  },

  {
    categoria: "Sanduíches",
    produtos: [
      {
        id: 27,
        nome: "X - Tudo com carne artesanal",
        preco: 23,
        descricao:
          "Pão, presunto de peru, queijo, carne artesanal, calabresa, salsicha, ovo, bacon, tomate e alface",
        imagem: xburguer,
      },
      {
        id: 28,
        nome: "X - Tudo",
        preco: 25,
        descricao:
          "Pão, presunto de peru, queijo, carne, calabresa, salsicha, ovo, bacon, tomate e alface",
        imagem: batata,
      },
      {
        id: 29,
        nome: "X - Salada com duas carnes",
        preco: 17,
        descricao: "Pão, 2 presuntos, 2 queijo, 2 carne, ovo, tomate e alface",
        imagem: batata,
      },
      {
        id: 30,
        nome: "X - Salada artesanal",
        preco: 16,
        descricao:
          "Pão, presunto de peru, queijo, carne artesanal, ovo, tomate e alface",
        imagem: batata,
      },
      {
        id: 31,
        nome: "X - Bacon",
        preco: 15,
        descricao:
          "Pão, presunto de peru, queijo, carne, bacon, ovo, tomate e alface",
        imagem: batata,
      },
      {
        id: 32,
        nome: "X - Calabresa",
        preco: 15,
        descricao:
          "Pão, presunto de peru, queijo, carne, calabresa, ovo, tomate e alface",
        imagem: batata,
      },
      {
        id: 33,
        nome: "X - Salsicha",
        preco: 15,
        descricao:
          "Pão, presunto de peru, queijo, carne, salsicha, ovo, tomate e alface",
        imagem: batata,
      },
      {
        id: 34,
        nome: "X - Salada",
        preco: 10,
        descricao: "Pão, presunto de peru, queijo, carne, ovo, tomate e alface",
        imagem: batata,
      },
      {
        id: 35,
        nome: "X - Maionese",
        preco: 9,
        descricao: "Pão, presunto de peru, queijo, carne, tomate e alface",
        imagem: batata,
      },
      {
        id: 36,
        nome: "X - Burguer",
        preco: 7,
        descricao: "Pão, queijo, carne e salada",
        imagem: batata,
      },
      {
        id: 37,
        nome: "Hambúrguer",
        preco: 6,
        descricao: "Pão, queijo e carne",
        imagem: batata,
      },
      {
        id: 38,
        nome: "Misto Simples",
        preco: 5,
        descricao: "Pão de forma, queijo e presunto",
        imagem: batata,
      },
      {
        id: 39,
        nome: "X - Quarteirão",
        preco: 12,
        descricao:
          "Pão, carne, queijo cheddar duplo, cebola, cebola crua, tomate e alface",
        imagem: batata,
      },
    ],
  },
  {
    categoria: "Refrigerantes",
    produtos: [
      {
        id: 40,
        nome: "Regente 2 Lts",
        preco: 7,
        descricao: "Refrigerante regente de 2 litros",
        imagem: xburguer,
      },
      {
        id: 41,
        nome: "Magistral Gold 2 Lts",
        preco: 7,
        descricao: "Refrigerante magistral gold de 2 litros",
        imagem: batata,
      },
      {
        id: 42,
        nome: "Flesh Cola 2 Lts",
        preco: 7,
        descricao: "Refrigerante flesh cola 2 litros",
        imagem: batata,
      },
      {
        id: 43,
        nome: "Gury Cola 2 Lts",
        preco: 7,
        descricao: "Refrigerante gury cola 2 litros",
        imagem: batata,
      },
      {
        id: 44,
        nome: "Coca-Cola 2 Lts",
        preco: 14,
        descricao: "Refrigerante coca-cola 2 litros",
        imagem: batata,
      },
      {
        id: 45,
        nome: "Fanta Laranja 2 Lts",
        preco: 14,
        descricao: "Refrigerante fanta laranja 2 litros",
        imagem: batata,
      },
    ],
  },
  {
    categoria: "Combos de X - Saladas",
    produtos: [
      {
        id: 46,
        nome: "Combo 1 de X - Salada",
        preco: 25,
        descricao: "2 X - Saladas e um Refrigerante de 1 Lt",
        imagem: xburguer,
      },
      {
        id: 47,
        nome: "Combo 2 de X - Salada",
        preco: 35,
        descricao: "3 X- Saladas e um Refrigerante de 1 Lt + Batata Frita",
        imagem: batata,
      },
      {
        id: 48,
        nome: "Combo 3 de X- Salada",
        preco: 46,
        descricao: "4 X- Saladas e um Refrigerante de 2 Lts + Batata Frita",
        imagem: batata,
      },
      {
        id: 49,
        nome: "Combo 4 de X - Salada",
        preco: 62,
        descricao:
          "5 X - Saladas e um Refrigerante Coca - Cola de 2 Lts + Batata Frita",
        imagem: batata,
      },
      {
        id: 50,
        nome: "Combo 5 de X - Salada",
        preco: 76,
        descricao: "7 X - Saladas e um Refrigerante Tradicional de 2 Lts + Batata Frita",
        imagem: batata,
      },
    ],
  },
  {
    categoria: "Combos de Pizzas",
    produtos: [
      {
        id: 51,
        nome: "Combo Casal Perfeito",
        preco: 84,
        descricao: "2 Pizzas Grandes e um Refrigerante Coca - Cola de 2 Lts + Batata Frita",
        imagem: xburguer,
      },
      {
        id: 52,
        nome: "Combo Dupla Delícia",
        preco: 59,
        descricao: "2 Pizzas Médias e um Refrigerante Coca - Cola de 2 Lts + Batata Frita",
        imagem: batata,
      },
      {
        id: 53,
        nome: "Combo Brocado",
        preco: 115,
        descricao: "3 Pizzas Grandes e um Refrigerante Tradicional de 2 Lts + Batata Frita",
        imagem: batata,
      },
      {
        id: 54,
        nome: "Combo Trio Tentação",
        preco: 78,
        descricao:
          "2 Pizzas Grandes e um Refrigerante de 2 Lts + Batata Frita",
        imagem: batata,
      },
    ],
  },
  {
    categoria: "Pastéis",
    produtos: [
      {
        id: 55,
        nome: "Pastel de Queijo ( M )",
        preco: 6,
        descricao: "Queijo",
        imagem: xburguer,
      },
      {
        id: 56,
        nome: "Pastel de Queijo com Banana ( M )",
        preco: 6,
        descricao: "Queijo e Banana",
        imagem: batata,
      },
      {
        id: 57,
        nome: "Misto ( M )",
        preco: 6,
        descricao: "Carne e Queijo",
        imagem: batata,
      },
      {
        id: 58,
        nome: "Queijo ( G )",
        preco: 7,
        descricao: "Queijo",
        imagem: batata,
      },
      {
        id: 59,
        nome: "Queijo com Banana ( G )",
        preco: 7,
        descricao: "Queijo e Banana",
        imagem: batata,
      },
      {
        id: 60,
        nome: "Combo da Alegria",
        preco: 23,
        descricao: "3 pastéis variados ( M ) e um refrigerante em lata + batata frita",
        imagem: batata,
      },
      {
        id: 61,
        nome: "Combo da Felicidade",
        preco: 36,
        descricao: "5 pastéis variados ( M ) e um refrigerante de 1 Lt + batata frita",
        imagem: batata,
      },
    ],
  },
  {
    categoria: "Kikão",
    produtos: [
      {
        id: 62,
        nome: "Kikão",
        preco: 6,
        descricao: "Pão, salsicha, molho, maionese, ketchup e batata palha",
        imagem: xburguer,
      },
      {
        id: 63,
        nome: "Combo de Kikão",
        preco: 24,
        descricao: "3 Kikão e um Refrigerante de 1 Lt + Batata Frita",
        imagem: batata,
      },
    ],
  },
  {
    categoria: "Outros combos",
    produtos: [
      {
        id: 64,
        nome: "Combo de Mini Pizzas",
        preco: 30,
        descricao: "4 Mini pizzas e um refrigerante Baré de 1 Lt + Batata Frita",
        imagem: xburguer,
      },
      {
        id: 65,
        nome: "Combo Dose Dupla",
        preco: 50,
        descricao: "2 Mini pizzas, 2 kikão, 2 x - saladas e um refrigerante tradicional de 2 Lts + Batata Frita",
        imagem: batata,
      },
      {
        id: 66,
        nome: "Combo Os Curumins",
        preco: 39,
        descricao: "2 Hamburgueres, 2 mistos simples, 2 pastéis e um refrigerante tradicional de 1 Lt + Batata Frita",
        imagem: batata,
      },
    ],
  },
  {
    categoria: "Bebidas Alcoólicas",
    produtos: [
      {
        id: 67,
        nome: "Caixa Itaipava",
        preco: 46,
        descricao: "Caixa Itaipava 269Ml 15 Unidades",
        imagem: xburguer,
      },
      {
        id: 68,
        nome: "Budweiser Lata",
        preco: 6,
        descricao: "Budweiser Lata 350Ml",
        imagem: batata,
      },
      {
        id: 69,
        nome: "Itaipava Lata",
        preco: 3.50,
        descricao: "Itaipava Lata 269Ml",
        imagem: batata,
      },
      {
        id: 70,
        nome: "Promoção Itaipava Lata",
        preco: 10,
        descricao: "3 Itaipavas por 10$",
        imagem: batata,
      },
      {
        id: 71,
        nome: "Heineken Long-Neck",
        preco: 10,
        descricao: "Heineken 330Ml",
        imagem: batata,
      },
      {
        id: 72,
        nome: "Corona Long-Neck",
        preco: 10,
        descricao: "Corona 330Ml",
        imagem: batata,
      },
      {
        id: 73,
        nome: "Copão ( 500 Ml )",
        preco: 10,
        descricao: "Whisky, Gelo Saborizado e Energetico",
        imagem: batata,
      },
      {
        id: 74,
        nome: "Copão de Gin ( 500 Ml )",
        preco: 12,
        descricao: "Gin, Gelo Saborizado e Energetico",
        imagem: batata,
      },
    ],
  },
];

function Cardapio() {
  const { addToCart } = useCart();
  const [toasts, setToasts] = useState([]);

  const scrollToSecao = (categoria) => {
    const id = categoria.replace(/\s+/g, "-");

    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const addToast = (message) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  const handleAdd = (item, e) => {
    addToCart(item);
    addToast(`${item.nome} adicionado ao carrinho`);

    // animação no botão
    const btn = e.currentTarget;
    btn.classList.add("clicked");

    setTimeout(() => {
      btn.classList.remove("clicked");
    }, 300);
  };

  return (
    <main className="cardapio">
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.message}
          </div>
        ))}
      </div>
      <h1>Cardápio</h1>
      <br></br>
      <div className="categorias">
        {cardapio.map((secao) => (
          <button
            key={secao.categoria}
            onClick={() => scrollToSecao(secao.categoria)}
          >
            {secao.categoria}
          </button>
        ))}
      </div>

      {cardapio.map((secao) => (
        <section
          key={secao.categoria}
          id={secao.categoria.replace(/\s+/g, "-")}
          className="secao-cardapio"
        >
          <h1>{secao.categoria}</h1>
          <br></br>

          <div className="produtos">
            {secao.produtos.map((item) => (
              <div key={item.id} className="produto-card">

                <h3>{item.nome}</h3>
                <p className="descricao">{item.descricao}</p>
                <p className="preco">R$ {item.preco.toFixed(2)}</p>

                <button onClick={(e) => handleAdd(item, e)}>
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Cardapio;
