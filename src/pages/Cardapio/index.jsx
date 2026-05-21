import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { storeConfig } from "../../config/store";
import { useCart } from "../../context/cartContextValue";
import { cardapio } from "../../data/cardapio";
import { withMenuImages } from "../../data/menuImages";
import { getStoreStatus } from "../../utils/storeStatus";
import CategoriaNav from "./components/CategoriaNav";
import DeliveryRates from "./components/DeliveryRates";
import ProdutoCard from "./components/ProdutoCard";
import ResumoCarrinhoFlutuante from "./components/ResumoCarrinhoFlutuante";
import StoreStatus from "./components/StoreStatus";

import "./styles.css";

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function Cardapio() {
  const { cart, addToCart } = useCart();
  const [toasts, setToasts] = useState([]);
  const [busca, setBusca] = useState("");
  const status = getStoreStatus(storeConfig.schedule);

  const menuComImagens = useMemo(() => withMenuImages(cardapio), []);

  const secoesFiltradas = useMemo(() => {
    const termo = normalize(busca.trim());
    if (!termo) return menuComImagens;

    return menuComImagens
      .map((secao) => ({
        ...secao,
        produtos: secao.produtos.filter((item) =>
          normalize(`${item.nome} ${item.descricao} ${secao.categoria}`).includes(termo),
        ),
      }))
      .filter((secao) => secao.produtos.length > 0);
  }, [busca, menuComImagens]);

  const scrollToSecao = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
      2500,
    );
  };

  const handleAdd = (item, e, customMessage) => {
    if (!item) {
      addToast(customMessage, "error");
      return;
    }

    addToCart(item);
    addToast(`${item.nome} adicionado!`);

    const btn = e.currentTarget;
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 300);
  };

  return (
    <main className="cardapio">
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type === "error" ? "toast-error" : ""}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <div className="cardapio-hero">
        <span className="cardapio-hero-eyebrow">pedido rápido</span>
        <h1>Cardápio</h1>
        <p>Escolha uma categoria, adicione ao carrinho e finalize pelo WhatsApp.</p>
        <StoreStatus status={status} />
      </div>

      <section className="cardapio-tools" aria-label="Busca do cardápio">
        <label className="search-box">
          <FaSearch aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar por pizza, x-bacon, coca..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </label>
      </section>

      <DeliveryRates />

      <CategoriaNav secoes={menuComImagens} onNavigate={scrollToSecao} />

      {secoesFiltradas.length === 0 ? (
        <section className="empty-menu">
          <h2>Nenhum item encontrado</h2>
          <p>Tente buscar por outro nome, categoria ou ingrediente.</p>
        </section>
      ) : (
        secoesFiltradas.map((secao) => (
          <section
            key={secao.categoria}
            id={secao.categoria.replace(/\s+/g, "-")}
            className={`secao-cardapio ${secao.destaque ? "secao-destaque" : ""}`}
          >
            <div className="secao-header">
              <div>
                {secao.image && <img className="secao-thumb" src={secao.image} alt="" />}
              </div>
              <h2>{secao.categoria}</h2>
              <div className="secao-divider" />
            </div>

            <div className="produtos">
              {secao.produtos.map((item) => (
                <ProdutoCard
                  key={`${secao.categoria}-${item.id}`}
                  item={item}
                  onAdd={handleAdd}
                />
              ))}
            </div>
          </section>
        ))
      )}

      <ResumoCarrinhoFlutuante cart={cart} />
    </main>
  );
}

export default Cardapio;
