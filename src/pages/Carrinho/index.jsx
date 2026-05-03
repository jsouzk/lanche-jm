import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

import "./styles.css";

const taxas = {
  estrada_lbv: 3,
  estrada_apaloosa: 5,
  estrada_atem: 10,
  km26: 20,
  vila: 2,
  jutai: 3,
};

const locaisEntrega = [
  { value: "estrada_lbv", label: "Estrada - até a LBV Telecom", taxa: 3 },
  { value: "estrada_apaloosa", label: "Estrada - até o Apaloosa", taxa: 5 },
  { value: "estrada_atem", label: "Estrada - até o Posto ATEM", taxa: 10 },
  { value: "km26", label: "KM26", taxa: 20 },
  { value: "vila", label: "Vila", taxa: 2 },
  { value: "jutai", label: "Jutaí", taxa: 3 },
];

function Carrinho() {
  const [observacao, setObservacao] = useState("");
  const [tipoPedido, setTipoPedido] = useState("");
  const [endereco, setEndereco] = useState("");
  const [local, setLocal] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [valorPago, setValorPago] = useState("");
  const [valorNumerico, setValorNumerico] = useState(0);
  const [nomeCliente, setNomeCliente] = useState("");

  const { cart, increase, decrease, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);
  const taxaEntrega = tipoPedido === "entrega" && local ? taxas[local] : 0;
  const total = subtotal + taxaEntrega;

  let taxaPagamento = 0;
  if (pagamento === "credito") taxaPagamento = total * 0.0498;
  else if (pagamento === "debito") taxaPagamento = total * 0.0199;

  const totalFinal = total + taxaPagamento;
  const troco = pagamento === "dinheiro" ? valorNumerico - totalFinal : 0;

  const chavePix = "+5592985892962";
  const nomeRecebedor = "MARCIA DE SOUZA ALBUQUERQUE";
  const cidade = "IRANDUBA";

  const gerarPayloadPix = ({ chave, nome, cidade, valor }) => {
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

    const crc16 = (str) => {
      let crc = 0xffff;
      for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
          crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        }
      }
      return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
    };

    const payloadFinal = payload + "6304";
    return payloadFinal + crc16(payloadFinal);
  };

  const payloadPix = gerarPayloadPix({
    chave: chavePix,
    nome: nomeRecebedor,
    cidade,
    valor: totalFinal,
  });

  const handleValorPago = (e) => {
    const apenasNumeros = e.target.value.replace(/\D/g, "");
    if (!apenasNumeros) {
      setValorPago("");
      setValorNumerico(0);
      return;
    }

    const numero = Number(apenasNumeros) / 100;
    setValorNumerico(numero);
    setValorPago(numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
  };

  const finalizarPedido = () => {
    if (!tipoPedido || (tipoPedido === "entrega" && (!endereco || !local)) || !pagamento) {
      alert("Preencha todas as informações!");
      return;
    }

    const divisor = "-----------------------------";
    const itens = cart
      .map((item) => `- ${item.nome} x${item.quantity} - R$ ${(item.preco * item.quantity).toFixed(2)}`)
      .join("\n");

    const mensagem = `NOVO PEDIDO - LANCHE J.M

CLIENTE: ${nomeCliente}

${divisor}
ITENS:
${itens}

${divisor}
RESUMO:
Subtotal: R$ ${subtotal.toFixed(2)}
Entrega: R$ ${taxaEntrega.toFixed(2)}
Taxa maquininha: R$ ${taxaPagamento.toFixed(2)}
TOTAL: R$ ${totalFinal.toFixed(2)}

${divisor}
TIPO: ${tipoPedido === "entrega" ? `ENTREGA\nENDEREÇO: ${endereco}` : "RETIRADA NO LOCAL"}
${observacao ? `\nOBSERVAÇÕES:\n${observacao}` : ""}

${divisor}
PAGAMENTO: ${pagamento.toUpperCase()}
${pagamento === "dinheiro" ? `TROCO PARA: R$ ${valorNumerico.toFixed(2)}` : ""}
${pagamento === "pix" ? "ENVIAR COMPROVANTE APÓS O PIX" : ""}

Pedido às ${new Date().toLocaleTimeString()} - Obrigado!`;

    window.open(`https://wa.me/5592984525890?text=${encodeURIComponent(mensagem)}`, "_blank");
    clearCart();
  };

  const isFormValid =
    cart.length > 0 &&
    nomeCliente &&
    tipoPedido &&
    pagamento &&
    (tipoPedido === "retirada" || (tipoPedido === "entrega" && endereco && local)) &&
    (pagamento !== "dinheiro" || valorNumerico >= totalFinal);

  return (
    <main className="carrinho">
      <section className="cart-hero">
        <span className="cart-eyebrow">pedido no capricho</span>
        <h1>Carrinho</h1>
        <p>Confira os itens, escolha a entrega e finalize direto pelo WhatsApp.</p>
      </section>

      {cart.length === 0 ? (
        <p className="empty">Seu carrinho está vazio.</p>
      ) : (
        <div className="cart-layout">
          <section className="cart-panel cart-items-panel">
            <h2>Itens escolhidos</h2>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-info">
                  <h3>{item.nome}</h3>
                  <div className="qty-control">
                    <button onClick={() => decrease(item.id)} aria-label={`Diminuir ${item.nome}`}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(item.id)} aria-label={`Aumentar ${item.nome}`}>
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-actions">
                  <span>R$ {(item.preco * item.quantity).toFixed(2)}</span>
                  <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                    Remover
                  </button>
                </div>
              </div>
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
                          onChange={(e) => setLocal(e.target.value)}
                        />
                        {l.label} - <strong>R$ {l.taxa}</strong>
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
                      onChange={(e) => setPagamento(e.target.value)}
                    />
                    {op.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h2>Observações</h2>
              <textarea
                placeholder="Ex: sem cebola, sem tomate, ponto da carne..."
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
                    {troco < 0 ? "Valor insuficiente!" : `Troco: R$ ${troco.toFixed(2)}`}
                  </p>
                )}
              </div>
            )}

            {pagamento === "pix" && (
              <div className="pix-box">
                <h3>Pague com Pix</h3>
                <QRCodeCanvas value={payloadPix} size={180} />
                <div className="pix-copy">
                  <span>{payloadPix}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(payloadPix);
                      alert("Código Pix copiado!");
                    }}
                  >
                    Copiar código
                  </button>
                </div>
                <small>O valor já está preenchido. Após pagar, envie o comprovante no WhatsApp.</small>
              </div>
            )}

            <div className="cart-total">
              <p><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></p>
              <p><span>Entrega</span><span>R$ {taxaEntrega.toFixed(2)}</span></p>
              <p><span>Taxa maquininha</span><span>R$ {taxaPagamento.toFixed(2)}</span></p>
              <h2><span>Total</span><span>R$ {totalFinal.toFixed(2)}</span></h2>
            </div>

            <div className="cart-buttons">
              <button className="btn-clear" onClick={clearCart}>
                Limpar carrinho
              </button>
              <button className="btn-finish" onClick={finalizarPedido} disabled={!isFormValid}>
                <FaWhatsapp size={18} />
                Finalizar pedido
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Carrinho;
