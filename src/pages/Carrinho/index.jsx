import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

import { storeConfig, locaisEntrega, taxasEntrega } from "../../config/store";
import { useCart } from "../../context/cartContextValue";
import { formatCurrency } from "../../utils/formatCurrency";
import { getStoreStatus } from "../../utils/storeStatus";
import CartItem from "./components/CartItem";
import PixBox from "./components/PixBox";
import ResumoPedido from "./components/ResumoPedido";

import "./styles.css";

const savedCustomerKey = "lanchejm_customer_data";

const getSavedCustomer = () => {
  try {
    return JSON.parse(localStorage.getItem(savedCustomerKey)) || {};
  } catch {
    return {};
  }
};

function Carrinho() {
  const savedCustomer = useMemo(() => getSavedCustomer(), []);
  const [observacao, setObservacao] = useState("");
  const [tipoPedido, setTipoPedido] = useState(savedCustomer.tipoPedido || "");
  const [endereco, setEndereco] = useState(savedCustomer.endereco || "");
  const [referencia, setReferencia] = useState(savedCustomer.referencia || "");
  const [local, setLocal] = useState(savedCustomer.local || "");
  const [pagamento, setPagamento] = useState(savedCustomer.pagamento || "");
  const [valorPago, setValorPago] = useState("");
  const [valorNumerico, setValorNumerico] = useState(0);
  const [nomeCliente, setNomeCliente] = useState(savedCustomer.nomeCliente || "");
  const [erro, setErro] = useState("");
  const [showReview, setShowReview] = useState(false);

  const {
    cart,
    increase,
    decrease,
    removeFromCart,
    updateItemObservation,
    clearCart,
  } = useCart();
  const storeStatus = getStoreStatus(storeConfig.schedule);

  const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);
  const taxaEntrega = tipoPedido === "entrega" && local ? taxasEntrega[local] : 0;
  const total = subtotal + taxaEntrega;

  let taxaPagamento = 0;
  if (pagamento === "credito") taxaPagamento = total * 0.0498;
  else if (pagamento === "debito") taxaPagamento = total * 0.0199;

  const totalFinal = total + taxaPagamento;
  const troco = pagamento === "dinheiro" ? valorNumerico - totalFinal : 0;
  const localEntrega = locaisEntrega.find((item) => item.value === local);
  const orderId = useMemo(() => {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replaceAll("-", "");
    const time = now.toTimeString().slice(0, 5).replace(":", "");
    return `JM-${date}-${time}`;
  }, []);

  useEffect(() => {
    localStorage.setItem(
      savedCustomerKey,
      JSON.stringify({ nomeCliente, tipoPedido, endereco, referencia, local, pagamento }),
    );
  }, [nomeCliente, tipoPedido, endereco, referencia, local, pagamento]);

  const payloadPix = useMemo(
    () =>
      gerarPayloadPix({
        chave: storeConfig.pixKey,
        nome: storeConfig.pixReceiver,
        cidade: storeConfig.pixCity,
        valor: totalFinal,
      }),
    [totalFinal],
  );

  const handleValorPago = (e) => {
    const apenasNumeros = e.target.value.replace(/\D/g, "");
    if (!apenasNumeros) {
      setValorPago("");
      setValorNumerico(0);
      return;
    }

    const numero = Number(apenasNumeros) / 100;
    setValorNumerico(numero);
    setValorPago(formatCurrency(numero));
  };

  const validarPedido = () => {
    if (cart.length === 0) return "Seu carrinho está vazio.";
    if (!nomeCliente.trim()) return "Informe seu nome.";
    if (!tipoPedido) return "Escolha entrega ou retirada.";
    if (tipoPedido === "entrega" && !endereco.trim()) return "Informe o endereço completo.";
    if (tipoPedido === "entrega" && !referencia.trim()) return "Informe um ponto de referência.";
    if (tipoPedido === "entrega" && !local) return "Escolha o local de entrega.";
    if (!pagamento) return "Escolha a forma de pagamento.";
    if (pagamento === "dinheiro" && valorNumerico < totalFinal) {
      return "Informe um valor suficiente para calcular o troco.";
    }
    return "";
  };

  const handleClearCart = () => {
    if (window.confirm("Tem certeza que deseja limpar o carrinho?")) {
      clearCart();
    }
  };

  const abrirRevisao = () => {
    const mensagemErro = validarPedido();
    if (mensagemErro) {
      setErro(mensagemErro);
      setShowReview(false);
      return;
    }

    setErro("");
    setShowReview(true);
  };

  const gerarMensagemPedido = () => {
    const itens = cart
      .map((item, index) => {
        const combo = item.comboPizzas?.length
          ? `\n${item.comboPizzas.map((pizza) => `   ${pizza.label}: ${pizza.sabor}`).join("\n")}`
          : "";
        const sabores = !combo && item.sabores ? `\n   Sabores: ${item.sabores}` : "";
        const itemObs = item.observation?.trim() ? `\n   Obs. item: ${item.observation.trim()}` : "";

        return `${index + 1}. ${item.nome}
   Quantidade: ${item.quantity}
   Unitário: ${formatCurrency(item.preco)}
   Total item: ${formatCurrency(item.preco * item.quantity)}${combo}${sabores}${itemObs}`;
      })
      .join("\n\n");

    const retiradaOuEntrega = tipoPedido === "entrega"
      ? `Entrega
Endereço: ${endereco.trim()}
Referência: ${referencia.trim()}
Local: ${localEntrega?.label}
Taxa: ${formatCurrency(taxaEntrega)}`
      : "Retirada no local";

    const pagamentoTexto = [
      `Forma: ${pagamento.toUpperCase()}`,
      pagamento === "credito" ? "Taxa do cartão de crédito: +4,98%" : "",
      pagamento === "debito" ? "Taxa do cartão de débito: +1,99%" : "",
      pagamento === "dinheiro" ? `Troco para: ${formatCurrency(valorNumerico)}` : "",
      pagamento === "dinheiro" ? `Troco: ${formatCurrency(troco)}` : "",
      pagamento === "pix" ? "Enviar comprovante após o Pix" : "",
    ].filter(Boolean).join("\n");

    return `NOVO PEDIDO - LANCHE J.M
Pedido: ${orderId}

Loja: ${storeStatus.label} (${storeStatus.detail})

CLIENTE
Nome: ${nomeCliente.trim()}

ITENS
${itens}

ENTREGA/RETIRADA
${retiradaOuEntrega}

PAGAMENTO
${pagamentoTexto}

RESUMO
Subtotal: ${formatCurrency(subtotal)}
Entrega: ${formatCurrency(taxaEntrega)}
Taxa maquininha: ${formatCurrency(taxaPagamento)}
Total: ${formatCurrency(totalFinal)}

OBSERVAÇÕES GERAIS
${observacao.trim() || "Sem observações."}

Pedido às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}.`;
  };

  const enviarWhatsApp = () => {
    if (!storeStatus.isOpen && !window.confirm("A loja aparece como fechada agora. Deseja enviar o pedido mesmo assim?")) {
      return;
    }

    window.open(
      `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(gerarMensagemPedido())}`,
      "_blank",
    );

    if (window.confirm("Pedido enviado no WhatsApp? Deseja limpar o carrinho?")) {
      clearCart();
      setShowReview(false);
    }
  };

  const faltaPreencher = validarPedido();
  const isFormValid = !faltaPreencher;

  return (
    <main className="carrinho">
      <section className="cart-hero">
        <span className="cart-eyebrow">pedido no capricho</span>
        <h1>Carrinho</h1>
        <p>Confira os itens, escolha a entrega e finalize direto pelo WhatsApp.</p>
        <div className={`cart-store-status ${storeStatus.isOpen ? "open" : "closed"}`}>
          <strong>{storeStatus.label}</strong>
          <span>{storeStatus.detail}</span>
        </div>
      </section>

      {cart.length === 0 ? (
        <div className="empty">
          <p>Seu carrinho está vazio.</p>
          <Link to="/cardapio" className="btn-continue">Continuar comprando</Link>
        </div>
      ) : (
        <>
          <div className="cart-layout">
            <section className="cart-panel cart-items-panel">
              <div className="panel-title-row">
                <h2>Itens escolhidos</h2>
                <Link to="/cardapio">Continuar comprando</Link>
              </div>
              {cart.map((item) => (
                <CartItem
                  key={item.cartId || String(item.id)}
                  item={item}
                  onIncrease={increase}
                  onDecrease={decrease}
                  onRemove={removeFromCart}
                  onObservationChange={updateItemObservation}
                />
              ))}
            </section>

            <section className="cart-panel">
              <div className="form-section">
                <h2>Seus dados</h2>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                />
              </div>

              <div className="form-section">
                <h2>Tipo de pedido</h2>
                <div className="option-grid two">
                  {["entrega", "retirada"].map((tipo) => (
                    <label key={tipo}>
                      <input
                        type="radio"
                        name="tipo"
                        value={tipo}
                        checked={tipoPedido === tipo}
                        onChange={(e) => setTipoPedido(e.target.value)}
                      />
                      {tipo === "entrega" ? "Entrega" : "Retirar no local"}
                    </label>
                  ))}
                </div>
              </div>

              {tipoPedido === "entrega" && (
                <>
                  <div className="form-section">
                    <h2>Endereço</h2>
                    <input
                      type="text"
                      placeholder="Digite seu endereço completo"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Ponto de referência"
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                    />
                  </div>

                  <div className="form-section">
                    <h2>Local de entrega</h2>
                    <div className="option-grid">
                      {locaisEntrega.map((l) => (
                        <label key={l.value}>
                          <input
                            type="radio"
                            name="local"
                            value={l.value}
                            checked={local === l.value}
                            onChange={(e) => setLocal(e.target.value)}
                          />
                          {l.label} - <strong>{formatCurrency(l.taxa)}</strong>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="form-section">
                <h2>Forma de pagamento</h2>
                <div className="option-grid two">
                  {[
                    { value: "pix", label: "Pix" },
                    { value: "dinheiro", label: "Dinheiro" },
                    { value: "credito", label: "Cartão de crédito (+4,98%)" },
                    { value: "debito", label: "Cartão de débito (+1,99%)" },
                  ].map((op) => (
                    <label key={op.value}>
                      <input
                        type="radio"
                        name="pagamento"
                        value={op.value}
                        checked={pagamento === op.value}
                        onChange={(e) => setPagamento(e.target.value)}
                      />
                      {op.label}
                    </label>
                  ))}
                </div>
                {(pagamento === "credito" || pagamento === "debito") && (
                  <p className="fee-hint">
                    {pagamento === "credito"
                      ? "Crédito soma 4,98% de taxa da maquininha."
                      : "Débito soma 1,99% de taxa da maquininha."}
                  </p>
                )}
              </div>

              <div className="form-section">
                <h2>Observações gerais</h2>
                <textarea
                  placeholder="Ex: entregar no portão, ligar ao chegar..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  rows={4}
                />
              </div>

              {pagamento === "dinheiro" && (
                <div className="form-section">
                  <h3>Valor pago</h3>
                  <input
                    type="text"
                    placeholder="Ex: R$ 50,00"
                    value={valorPago}
                    onChange={handleValorPago}
                  />
                  {valorPago && (
                    <p className={`troco-label ${troco < 0 ? "error" : ""}`}>
                      {troco < 0 ? "Valor insuficiente!" : `Troco: ${formatCurrency(troco)}`}
                    </p>
                  )}
                </div>
              )}

              {pagamento === "pix" && <PixBox payloadPix={payloadPix} />}

              <ResumoPedido
                subtotal={subtotal}
                taxaEntrega={taxaEntrega}
                taxaPagamento={taxaPagamento}
                totalFinal={totalFinal}
              />

              {!isFormValid && <p className="missing-hint">{faltaPreencher}</p>}
              {erro && <p className="form-error" role="alert">{erro}</p>}

              <div className="cart-buttons">
                <button className="btn-clear" onClick={handleClearCart}>
                  Limpar carrinho
                </button>
                <button className="btn-finish" onClick={abrirRevisao} disabled={!isFormValid}>
                  <FaWhatsapp size={18} />
                  Revisar pedido
                </button>
              </div>
            </section>
          </div>

          {showReview && (
            <section className="review-panel" aria-live="polite">
              <div className="review-header">
                <div>
                  <span>Pedido {orderId}</span>
                  <h2>Confira antes de enviar</h2>
                </div>
                <button type="button" onClick={() => setShowReview(false)}>Editar</button>
              </div>

              <div className="review-grid">
                <div>
                  <h3>Cliente</h3>
                  <p>{nomeCliente}</p>
                </div>
                <div>
                  <h3>Entrega/retirada</h3>
                  <p>{tipoPedido === "entrega" ? `${localEntrega?.label} - ${endereco}` : "Retirada no local"}</p>
                  {tipoPedido === "entrega" && <small>Referência: {referencia}</small>}
                </div>
                <div>
                  <h3>Pagamento</h3>
                  <p>{pagamento.toUpperCase()}</p>
                </div>
                <div>
                  <h3>Total</h3>
                  <p>{formatCurrency(totalFinal)}</p>
                </div>
              </div>

              <button type="button" className="btn-send-whatsapp" onClick={enviarWhatsApp}>
                <FaWhatsapp size={18} />
                Enviar pelo WhatsApp
              </button>
            </section>
          )}

          <div className="mobile-checkout-bar">
            <span>Total: {formatCurrency(totalFinal)}</span>
            <button type="button" onClick={abrirRevisao} disabled={!isFormValid}>
              Revisar
            </button>
          </div>
        </>
      )}
    </main>
  );
}

function gerarPayloadPix({ chave, nome, cidade, valor }) {
  const format = (id, value) => {
    const size = value.length.toString().padStart(2, "0");
    return `${id}${size}${value}`;
  };

  let payload =
    format("00", "01") +
    format("26", format("00", "BR.GOV.BCB.PIX") + format("01", chave.trim())) +
    format("52", "0000") +
    format("53", "986");

  if (valor && valor > 0) payload += format("54", Number(valor).toFixed(2));

  payload +=
    format("58", "BR") +
    format("59", nome.substring(0, 25).toUpperCase()) +
    format("60", cidade.substring(0, 15).toUpperCase()) +
    format("62", format("05", "***"));

  const payloadFinal = payload + "6304";
  return payloadFinal + crc16(payloadFinal);
}

function crc16(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
}

export default Carrinho;
