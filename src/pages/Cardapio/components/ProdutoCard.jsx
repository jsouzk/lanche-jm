import { useState } from "react";

import {
  saboresCombosPizza,
  saboresPizzaFamilia,
  saboresPizzaGrande,
} from "../../../data/cardapio";
import { formatCurrency } from "../../../utils/formatCurrency";

function ProdutoCard({ item, onAdd }) {
  const [sabores, setSabores] = useState([]);
  const [comboPizzas, setComboPizzas] = useState(() =>
    Array.from({ length: item.flavorCount || 0 }, () => ""),
  );

  const isPizzaFamilia = item.requiresFlavors;
  const isPizzaGrandeDuas = item.requiresLargeFlavorMix;
  const isComboPizza = item.requiresComboFlavors;
  const hasFlavorPicker = isPizzaFamilia || isPizzaGrandeDuas || isComboPizza;
  const limiteSabores = isPizzaGrandeDuas ? 2 : item.flavorCount || 3;
  const opcoesSabores = (() => {
    if (isPizzaGrandeDuas) return saboresPizzaGrande;
    if (isComboPizza) return saboresCombosPizza.map((nome) => ({ nome }));
    return saboresPizzaFamilia.map((nome) => ({ nome }));
  })();

  const saboresGrandesSelecionados = opcoesSabores.filter((sabor) =>
    sabores.includes(sabor.nome),
  );
  const precoCalculado = isPizzaGrandeDuas && saboresGrandesSelecionados.length > 0
    ? Math.max(...saboresGrandesSelecionados.map((sabor) => sabor.preco))
    : item.preco;

  const toggleSabor = (sabor) => {
    setSabores((prev) => {
      if (prev.includes(sabor)) return prev.filter((item) => item !== sabor);
      if (prev.length === limiteSabores) return prev;
      return [...prev, sabor];
    });
  };

  const updateComboPizza = (index, sabor) => {
    setComboPizzas((prev) => prev.map((item, itemIndex) => (itemIndex === index ? sabor : item)));
  };

  const handleAdd = (event) => {
    if (isPizzaFamilia && sabores.length === 0) {
      onAdd(null, event, "Escolha pelo menos 1 sabor para essa pizza.");
      return;
    }

    if (isPizzaGrandeDuas && sabores.length !== 2) {
      onAdd(null, event, "Escolha exatamente 2 sabores para juntar na pizza grande.");
      return;
    }

    if (isComboPizza && comboPizzas.some((sabor) => !sabor)) {
      onAdd(null, event, `Escolha o sabor de cada uma das ${limiteSabores} pizzas do combo.`);
      return;
    }

    const saboresSelecionados = isComboPizza
      ? comboPizzas.map((sabor, index) => `Pizza ${index + 1}: ${sabor}`).join(" | ")
      : sabores.join(", ");

    onAdd(
      {
        ...item,
        preco: precoCalculado,
        sabores: saboresSelecionados,
        comboPizzas: isComboPizza
          ? comboPizzas.map((sabor, index) => ({ label: `Pizza ${index + 1}`, sabor }))
          : undefined,
        cartId: hasFlavorPicker
          ? `${item.id}-${saboresSelecionados.toLowerCase()}`
          : String(item.id),
      },
      event,
    );
  };

  return (
    <article className={`produto-card ${hasFlavorPicker ? "produto-card-family" : ""}`}>
      {item.image && (
        <img className="produto-image" src={item.image} alt="" loading="lazy" />
      )}

      <h3>{item.nome}</h3>
      <p className="descricao">{item.descricao}</p>

      {isComboPizza && (
        <div className="combo-picker">
          <span>Sabores do combo</span>
          {comboPizzas.map((saborSelecionado, index) => (
            <label key={`${item.id}-pizza-${index}`}>
              Pizza {index + 1}
              <select
                value={saborSelecionado}
                onChange={(event) => updateComboPizza(index, event.target.value)}
              >
                <option value="">Escolha um sabor</option>
                {opcoesSabores.map((sabor) => (
                  <option key={sabor.nome} value={sabor.nome}>
                    {sabor.nome}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}

      {!isComboPizza && hasFlavorPicker && (
        <div className="flavor-picker">
          <span>Sabores ({sabores.length}/{limiteSabores})</span>
          <div className="flavor-grid">
            {opcoesSabores.map((sabor) => (
              <label key={sabor.nome} className={sabores.includes(sabor.nome) ? "selected" : ""}>
                <input
                  type="checkbox"
                  checked={sabores.includes(sabor.nome)}
                  disabled={!sabores.includes(sabor.nome) && sabores.length === limiteSabores}
                  onChange={() => toggleSabor(sabor.nome)}
                />
                <span>{sabor.nome}</span>
                {isPizzaGrandeDuas && <strong>{formatCurrency(sabor.preco)}</strong>}
              </label>
            ))}
          </div>
        </div>
      )}

      <p className="preco">
        {isPizzaGrandeDuas && sabores.length === 0
          ? "Escolha 2 sabores"
          : formatCurrency(precoCalculado)}
      </p>

      <button type="button" onClick={handleAdd}>
        Adicionar ao carrinho
      </button>
    </article>
  );
}

export default ProdutoCard;
