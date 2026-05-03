import { useState } from "react";
import { useCart } from "../../context/CartContext";

import "./styles.css";

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
      },
      {
        id: 2,
        nome: "Bacon (Grande)",
        preco: 37,
        descricao: "Molho de tomate, queijo, bacon, azeitona, cebola e orégano",
      },
      {
        id: 3,
        nome: "Calabresa (Grande)",
        preco: 35,
        descricao:
          "Molho de tomate, queijo mussarela, calabresa, azeitona, orégano e cebola",
      },
      {
        id: 4,
        nome: "Baiana (Grande)",
        preco: 35,
        descricao:
          "Molho de tomate, queijo mussarela, calabresa, azeitona, orégano e cebola",
      },
      {
        id: 5,
        nome: "Milho com Catupiry (Grande)",
        preco: 35,
        descricao:
          "Molho de tomate, queijo mussarela, presunto de peru, azeitona, catupiry e orégano",
      },
      {
        id: 6,
        nome: "Mussarela Crocante (Grande)",
        preco: 35,
        descricao: "Molho de tomate, queijo mussarela, batata palha e orégano",
      },
      {
        id: 7,
        nome: "Duetos (Grande)",
        preco: 34,
        descricao:
          "Molho de tomate, queijo mussarela, seleta, milho verde, orégano e azeitona",
      },
      {
        id: 8,
        nome: "Dois queijos (Grande)",
        preco: 34,
        descricao:
          "Molho de tomate, queijo mussarela, queijo cheddar e orégano",
      },
      {
        id: 9,
        nome: "Mussarela (Grande)",
        preco: 34,
        descricao: "Molho de tomate, queijo mussarela, verduras e orégano",
      },
      {
        id: 10,
        nome: "Bauru (Grande)",
        preco: 34,
        descricao:
          "Molho de tomate, queijo mussarela, presunto de peru, orégano e azeitona",
      },
      {
        id: 11,
        nome: "Marguerita (Grande)",
        preco: 32,
        descricao:
          "Molho de tomate, queijo mussarela, manjericão, tomate e orégano",
      },
      {
        id: 12,
        nome: "Chocolate com Banana (Grande)",
        preco: 42,
        descricao: "Queijo mussarela, banana e chocolate 50%",
      },
      {
        id: 13,
        nome: "Chocolate (Grande)",
        preco: 40,
        descricao: "Queijo mussarela e chocolate 50%",
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
      },
      {
        id: 15,
        nome: "Bacon (Média)",
        preco: 25,
        descricao: "Molho de tomate, queijo, bacon, azeitona, cebola e orégano",
      },
      {
        id: 16,
        nome: "Calabresa (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, calabresa, azeitona, orégano e cebola",
      },
      {
        id: 17,
        nome: "Baiana (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, calabresa, azeitona, orégano e cebola",
      },
      {
        id: 18,
        nome: "Milho com Catupiry (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, presunto de peru, azeitona, catupiry e orégano",
      },
      {
        id: 19,
        nome: "Mussarela Crocante (Média)",
        preco: 23,
        descricao: "Molho de tomate, queijo mussarela, batata palha e orégano",
      },
      {
        id: 20,
        nome: "Duetos (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, seleta, milho verde, orégano e azeitona",
      },
      {
        id: 21,
        nome: "Dois queijos (Média)",
        preco: 23,
        descricao:
          "Molho de tomate, queijo mussarela, queijo cheddar e orégano",
      },
      {
        id: 22,
        nome: "Mussarela (Média)",
        preco: 22,
        descricao: "Molho de tomate, queijo mussarela, verduras e orégano",
      },
      {
        id: 23,
        nome: "Bauru (Média)",
        preco: 22,
        descricao:
          "Molho de tomate, queijo mussarela, presunto de peru, orégano e azeitona",
      },
      {
        id: 24,
        nome: "Marguerita (Média)",
        preco: 22,
        descricao:
          "Molho de tomate, queijo mussarela, manjericão, tomate e orégano",
      },
      {
        id: 25,
        nome: "Chocolate com Banana (Média)",
        preco: 32,
        descricao: "Queijo mussarela, banana e chocolate 50%",
      },
      {
        id: 26,
        nome: "Chocolate (Média)",
        preco: 30,
        descricao: "Queijo mussarela e chocolate 50%",
      },
    ],
  },
  {
    categoria: "Sanduíches",
    produtos: [
      {
        id: 27,
        nome: "X-Tudo com carne artesanal",
        preco: 23,
        descricao:
          "Pão, presunto de peru, queijo, carne artesanal, calabresa, salsicha, ovo, bacon, tomate e alface",
      },
      {
        id: 28,
        nome: "X-Tudo",
        preco: 25,
        descricao:
          "Pão, presunto de peru, queijo, carne, calabresa, salsicha, ovo, bacon, tomate e alface",
      },
      {
        id: 29,
        nome: "X-Salada com duas carnes",
        preco: 17,
        descricao:
          "Pão, 2 presuntos, 2 queijos, 2 carnes, ovo, tomate e alface",
      },
      {
        id: 30,
        nome: "X-Salada artesanal",
        preco: 16,
        descricao:
          "Pão, presunto de peru, queijo, carne artesanal, ovo, tomate e alface",
      },
      {
        id: 31,
        nome: "X-Bacon",
        preco: 15,
        descricao:
          "Pão, presunto de peru, queijo, carne, bacon, ovo, tomate e alface",
      },
      {
        id: 32,
        nome: "X-Calabresa",
        preco: 15,
        descricao:
          "Pão, presunto de peru, queijo, carne, calabresa, ovo, tomate e alface",
      },
      {
        id: 33,
        nome: "X-Salsicha",
        preco: 15,
        descricao:
          "Pão, presunto de peru, queijo, carne, salsicha, ovo, tomate e alface",
      },
      {
        id: 34,
        nome: "X-Salada",
        preco: 10,
        descricao: "Pão, presunto de peru, queijo, carne, ovo, tomate e alface",
      },
      {
        id: 35,
        nome: "X-Maionese",
        preco: 9,
        descricao: "Pão, presunto de peru, queijo, carne, tomate e alface",
      },
      {
        id: 36,
        nome: "X-Burguer",
        preco: 7,
        descricao: "Pão, queijo, carne e salada",
      },
      {
        id: 37,
        nome: "Hambúrguer",
        preco: 6,
        descricao: "Pão, queijo e carne",
      },
      {
        id: 38,
        nome: "Misto simples",
        preco: 5,
        descricao: "Pão de forma, queijo e presunto",
      },
    ],
  },
  {
    categoria: "Combos de Sanduíches",
    produtos: [
      {
        id: 39,
        nome: "Combo 1 de X-Salada",
        preco: 20,
        descricao: "2 X-Saladas e um Refrigerante em Lata + Batata frita",
      },
      {
        id: 40,
        nome: "Combo 2 de X-Salada",
        preco: 35,
        descricao: "3 X-Saladas e um Refrigerante de 1 Lt + Batata frita",
      },
      {
        id: 41,
        nome: "Combo 3 de X-Salada",
        preco: 46,
        descricao: "4 X-Saladas e um Refrigerante de 2 Lts + Batata frita",
      },
      {
        id: 42,
        nome: "Combo 4 de X-Salada",
        preco: 62,
        descricao:
          "5 X-Saladas e um Refrigerante Coca-Cola de 2 Lts + Batata frita",
      },
      {
        id: 43,
        nome: "Combo 5 de X-Salada",
        preco: 76,
        descricao:
          "7 X-Saladas e um Refrigerante Tradicional de 2 Lts + Batata frita",
      },
    ],
  },
  {
    categoria: "Combos de Pizzas",
    produtos: [
      {
        id: 44,
        nome: "Combo Casal Perfeito",
        preco: 84,
        descricao:
          "2 Pizzas Grandes e um Refrigerante Coca-Cola de 2 Lts + Batata frita",
      },
      {
        id: 45,
        nome: "Combo Dupla Delícia",
        preco: 59,
        descricao:
          "2 Pizzas Médias e um Refrigerante Coca-Cola de 2 Lts + Batata frita",
      },
      {
        id: 46,
        nome: "Combo Brocado",
        preco: 115,
        descricao:
          "3 Pizzas Grandes e um Refrigerante Tradicional de 2 Lts + Batata frita",
      },
      {
        id: 47,
        nome: "Combo Trio Tentação",
        preco: 78,
        descricao: "2 Pizzas Grandes e um Refrigerante de 2 Lts + Batata frita",
      },
    ],
  },
  {
    categoria: "Pastéis",
    produtos: [
      { id: 48, nome: "Pastel de Queijo (M)", preco: 6, descricao: "Queijo" },
      {
        id: 49,
        nome: "Pastel de Queijo com Banana (M)",
        preco: 6,
        descricao: "Queijo e Banana",
      },
      { id: 50, nome: "Misto (M)", preco: 6, descricao: "Carne e Queijo" },
      { id: 51, nome: "Queijo (G)", preco: 7, descricao: "Queijo" },
      {
        id: 52,
        nome: "Queijo com Banana (G)",
        preco: 7,
        descricao: "Queijo e Banana",
      },
      {
        id: 53,
        nome: "Combo da Alegria",
        preco: 23,
        descricao:
          "3 pastéis variados (M) e um refrigerante em lata + batata frita",
      },
      {
        id: 54,
        nome: "Combo da Felicidade",
        preco: 36,
        descricao:
          "5 pastéis variados (M) e um refrigerante de 1 Lt + batata frita",
      },
    ],
  },
  {
    categoria: "Kikão",
    produtos: [
      {
        id: 55,
        nome: "Kikão",
        preco: 6,
        descricao: "Pão, salsicha, molho, maionese, ketchup e batata palha",
      },
      {
        id: 56,
        nome: "Combo de Kikão",
        preco: 24,
        descricao: "3 Kikão e um Refrigerante de 1 Lt + Batata frita",
      },
    ],
  },
  {
    categoria: "Outros Combos",
    produtos: [
      {
        id: 57,
        nome: "Combo de Mini Pizzas",
        preco: 30,
        descricao:
          "4 Mini pizzas e um refrigerante Baré de 1 Lt + Batata frita",
      },
      {
        id: 58,
        nome: "Combo Dose Dupla",
        preco: 50,
        descricao:
          "2 Mini pizzas, 2 Kikão, 2 X-Saladas e um refrigerante tradicional de 2 Lts + Batata frita",
      },
      {
        id: 59,
        nome: "Combo Os Curumins",
        preco: 39,
        descricao:
          "2 Hambúrgueres, 2 Mistos simples, 2 Pastéis e um refrigerante de 1 Lt + Batata frita",
      },
      {
        id: 60,
        nome: "Combo Turbinado",
        preco: 26,
        descricao:
          "1 X-Salada, 1 Misto quente, 1 Kikão, 1 Refrigerante em lata + Batata frita",
      },
    ],
  },
  {
    categoria: "Refrigerantes",
    produtos: [
      {
        id: 61,
        nome: "Regente 2Lt",
        preco: 7,
        descricao: "Refrigerante Regente 2Lt",
      },
      {
        id: 62,
        nome: "Magistral Gold 2Lt",
        preco: 7,
        descricao: "Refrigerante Magistral Gold 2Lt",
      },
      {
        id: 63,
        nome: "Gury Cola 2Lt",
        preco: 7,
        descricao: "Refrigerante Gury Cola 2Lt",
      },
      {
        id: 74,
        nome: "Flesh Cola 2Lt",
        preco: 7,
        descricao: "Refrigerante Flesh Cola 2Lt",
      },
      {
        id: 75,
        nome: "Coca-Cola 2Lt",
        preco: 14,
        descricao: "Refrigerante Coca-Cola 2Lt - sabor original",
      },
      {
        id: 76,
        nome: "Fanta Laranja 2Lt",
        preco: 14,
        descricao: "Refrigerante Fanta Laranja 2Lt",
      },
      {
        id: 77,
        nome: "Fanta Uva 2Lt",
        preco: 14,
        descricao: "Refrigerante Fanta Uva 2lt",
      },
      {
        id: 78,
        nome: "Coca-Cola 1Lt",
        preco: 9,
        descricao: "Refrigerante Coca-Cola 1Lt - sabor original",
      },
      {
        id: 79,
        nome: "Fanta Laranja 1Lt",
        preco: 9,
        descricao: "Refrigerante Fanta Laranja 1Lt",
      },
      {
        id: 80,
        nome: "Baré 1Lt",
        preco: 6,
        descricao: "Refrigerante Baré 1Lt",
      },
      {
        id: 81,
        nome: "Flesh Cola 1Lt",
        preco: 5,
        descricao: "Refrigerante Flesh Cola 1Lt",
      },
      {
        id: 82,
        nome: "Magistral Gold 1Lt",
        preco: 5,
        descricao: "Refrigerante Magistral Gold 1Lt",
      },
      {
        id: 83,
        nome: "Flesh Uva 1Lt",
        preco: 5,
        descricao: "Refrigerante Flesh Uva 1Lt",
      },
      {
        id: 84,
        nome: "Pepsi 1Lt",
        preco: 7,
        descricao: "Refrigerante Pepsi 1Lt",
      },
      {
        id: 85,
        nome: "Guaraná Antarctica 1Lt",
        preco: 7,
        descricao: "Refrigerante Guaraná Antarctica 1Lt",
      },
      {
        id: 86,
        nome: "Coca-Cola Lata",
        preco: 5,
        descricao: "Refrigerante Coca-Cola Lata",
      },
      {
        id: 87,
        nome: "Fanta Laranja Lata",
        preco: 5,
        descricao: "Refrigerante Fanta Laranja Lata",
      },
      {
        id: 88,
        nome: "Fanta Uva Lata",
        preco: 5,
        descricao: "Refrigerante Fanta Uva Lata",
      },
      {
        id: 89,
        nome: "Pepsi Lata",
        preco: 5,
        descricao: "Refrigerante Pepsi Lata",
      },
    ],
  },
  {
    categoria: "Bebidas Alcoólicas",
    produtos: [
      {
        id: 90,
        nome: "Caixa Itaipava",
        preco: 46,
        descricao: "Caixa Itaipava 269ml - 15 unidades",
      },
      {
        id: 91,
        nome: "Budweiser Lata",
        preco: 6,
        descricao: "Budweiser Lata 350ml",
      },
      {
        id: 92,
        nome: "Itaipava Lata",
        preco: 3.5,
        descricao: "Itaipava Lata 269ml",
      },
      {
        id: 93,
        nome: "Promoção Itaipava",
        preco: 10,
        descricao: "3 Itaipavas por R$ 10",
      },
      {
        id: 94,
        nome: "Heineken Long Neck",
        preco: 10,
        descricao: "Heineken 330ml",
      },
      {
        id: 95,
        nome: "Corona Long Neck",
        preco: 10,
        descricao: "Corona 330ml",
      },
      {
        id: 96,
        nome: "Copão de Whisky 500ml",
        preco: 10,
        descricao: "Whisky, gelo saborizado e energético",
      },
      {
        id: 97,
        nome: "Copão de Gin 500ml",
        preco: 12,
        descricao: "Gin, gelo saborizado e energético",
      },
    ],
  },
];

function Cardapio() {
  const { addToCart } = useCart();
  const [toasts, setToasts] = useState([]);

  const scrollToSecao = (categoria) => {
    const el = document.getElementById(categoria.replace(/\s+/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      2500,
    );
  };

  const handleAdd = (item, e) => {
    addToCart(item);
    addToast(`${item.nome} adicionado!`);
    const btn = e.currentTarget;
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 300);
  };

  return (
    <main className="cardapio">
      {/* TOASTS */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.message}
          </div>
        ))}
      </div>

      {/* HERO */}
      <div className="cardapio-hero">
        <h1>Cardápio</h1>
        <p>Escolha uma categoria, adicione ao carrinho e finalize pelo WhatsApp.</p>
      </div>

      {/* CATEGORIAS */}
      <nav className="categorias">
        {cardapio.map((secao) => (
          <button
            key={secao.categoria}
            onClick={() => scrollToSecao(secao.categoria)}
          >
            {secao.categoria}
          </button>
        ))}
      </nav>

      {/* SEES */}
      {cardapio.map((secao) => (
        <section
          key={secao.categoria}
          id={secao.categoria.replace(/\s+/g, "-")}
          className="secao-cardapio"
        >
          <div className="secao-header">
            <h2>
              {secao.categoria}
            </h2>
            <div className="secao-divider" />
          </div>

          <div className="produtos">
            {secao.produtos.map((item) => (
              <div key={item.id} className="produto-card">
                <h3>{item.nome}</h3>
                <p className="descricao">{item.descricao}</p>
                <p className="preco">R$ {item.preco.toFixed(2)}</p>

                <button onClick={(e) => handleAdd(item, e)}>
                  Adicionar ao carrinho
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
