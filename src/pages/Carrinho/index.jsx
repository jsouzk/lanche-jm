import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { QRCodeCanvas } from "qrcode.react";

import "./styles.css";

const taxas = {
  estrada_lbv: 3,
  estrada_apaloosa: 5,
  estrada_atem: 10,
  km26: 20,
  vila: 2,
  jutai: 3,
};

function Carrinho() {
  const [observacao, setObservacao] = useState("");
  const [tipoPedido, setTipoPedido] = useState("");
  const { cart, increase, decrease, removeFromCart, clearCart } = useCart();
  const [endereco, setEndereco] = useState("");
  const [local, setLocal] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [valorPago, setValorPago] = useState("");
  const [valorNumerico, setValorNumerico] = useState(0);
  const [nomeCliente, setNomeCliente] = useState("");

  const subtotal = cart.reduce(
    (acc, item) => acc + item.preco * item.quantity,
    0,
  );

  const taxaEntrega = tipoPedido === "entrega" && local ? taxas[local] : 0;
  const total = subtotal + taxaEntrega;
  let taxaPagamento = 0;

  if (pagamento === "credito") {
    taxaPagamento = total * 0.0498;
  } else if (pagamento === "debito") {
    taxaPagamento = total * 0.0199;
  }

  const totalFinal = total + taxaPagamento;
  const troco = pagamento === "dinheiro" ? valorNumerico - totalFinal : 0;
  const chavePix = "+5592985892962";
  const nomeRecebedor = "MARCIA DE SOUZA ALBUQUERQUE";
  const cidade = "IRANDUBA";

  /* GERADOR PIX */
  const gerarPayloadPix = ({ chave, nome, cidade, valor }) => {
    const format = (id, value) => {
      const size = value.length.toString().padStart(2, "0");
      return `${id}${size}${value}`;
    };

    let payload =
      format("00", "01") +
      format(
        "26",
        format("00", "BR.GOV.BCB.PIX") + format("01", chave.trim()), // 👈 trim importante
      ) +
      format("52", "0000") +
      format("53", "986");

    if (valor && valor > 0) {
      payload += format("54", Number(valor).toFixed(2));
    }

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
    const checksum = crc16(payloadFinal);

    return payloadFinal + checksum;
  };

  const payloadPix = gerarPayloadPix({
    chave: chavePix,
    nome: nomeRecebedor,
    cidade: cidade,
    valor: totalFinal,
  });

  const handleValorPago = (e) => {
    let valor = e.target.value;

    const apenasNumeros = valor.replace(/\D/g, "");

    if (!apenasNumeros) {
      setValorPago("");
      setValorNumerico(0);
      return;
    }

    const numero = Number(apenasNumeros) / 100;

    setValorNumerico(numero);

    const formatado = numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValorPago(formatado);
  };

  const itens = cart
    .map(
      (item) =>
        `• ${item.nome} x${item.quantity} - R$ ${(item.preco * item.quantity).toFixed(2)}`,
    )
    .join("\n");

  const finalizarPedido = () => {
    if (
      !tipoPedido ||
      (tipoPedido === "entrega" && (!endereco || !local)) ||
      !pagamento
    ) {
      alert("Preencha todas as informações!");
      return;
    }

    const numero = "5592984525890";

    const mensagem = `NOVO PEDIDO - LANCHE J.M

CLIENTE: ${nomeCliente}

----------------------------------------
ITENS:
${itens}

----------------------------------------
RESUMO DO PEDIDO:
Subtotal: R$ ${subtotal.toFixed(2)}
Entrega: R$ ${taxaEntrega.toFixed(2)}
Taxa pagamento: R$ ${taxaPagamento.toFixed(2)}

TOTAL: R$ ${totalFinal.toFixed(2)}

----------------------------------------
TIPO DE PEDIDO:
${tipoPedido === "entrega" ? "ENTREGA" : "RETIRADA"}

${
  tipoPedido === "entrega"
    ? `ENDEREÇO:
${endereco}`
    : "RETIRADA NO LOCAL"
}

${
  observacao
    ? `----------------------------------------
OBSERVAÇÕES:
${observacao}`
    : ""
}

----------------------------------------
PAGAMENTO:
${pagamento.toUpperCase()}

${pagamento === "dinheiro" ? `TROCO PARA: R$ ${valorNumerico.toFixed(2)}` : ""}

${pagamento === "pix" ? "ENVIAR COMPROVANTE DO PIX APÓS PAGAMENTO" : ""}

----------------------------------------
PEDIDO REALIZADO ÀS: ${new Date().toLocaleTimeString()}

Obrigado pela preferência!
`;

    const mensagemFormatada = encodeURIComponent(mensagem);

    window.open(`https://wa.me/${numero}?text=${mensagemFormatada}`, "_blank");

    clearCart();
  };

  const isFormValid =
    cart.length > 0 &&
    nomeCliente &&
    tipoPedido &&
    pagamento &&
    (tipoPedido === "retirada" ||
      (tipoPedido === "entrega" && endereco && local)) &&
    (pagamento !== "dinheiro" || valorNumerico >= totalFinal);

  return (
    <main className="carrinho">
      <h1>Carrinho</h1>

      {cart.length === 0 ? (
        <p className="empty">Seu carrinho está vazio</p>
      ) : (
        <>
          {/* ITENS */}
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-info">
                <img src={item.imagem} alt={item.nome} className="cart-img" />

                <div>
                  <h3>{item.nome}</h3>

                  <div className="qty-control">
                    <button onClick={() => decrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(item.id)}>+</button>
                  </div>
                </div>
              </div>

              <div className="cart-actions">
                <span>R$ {(item.preco * item.quantity).toFixed(2)}</span>

                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}

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

            <label>
              <input
                type="radio"
                name="tipo"
                value="entrega"
                onChange={(e) => setTipoPedido(e.target.value)}
              />
              Entrega
            </label>

            <label>
              <input
                type="radio"
                name="tipo"
                value="retirada"
                onChange={(e) => setTipoPedido(e.target.value)}
              />
              Retirar no local
            </label>
          </div>

          {/* ENDEREÇO */}
          {tipoPedido === "entrega" && (
            <div className="form-section">
              <h2>Endereço</h2>
              <input
                type="text"
                placeholder="Digite seu endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
          )}

          {/* LOCAL */}
          {tipoPedido === "entrega" && (
            <div className="form-section">
              <h2>Local de entrega</h2>

              <label>
                <input
                  type="radio"
                  name="local"
                  value="estrada_lbv"
                  onChange={(e) => setLocal(e.target.value)}
                />
                Estrada (R$ 3, até a LBV Telecom)
              </label>

              <label>
                <input
                  type="radio"
                  name="local"
                  value="estrada_apaloosa"
                  onChange={(e) => setLocal(e.target.value)}
                />
                Estrada (R$ 5, até o Apaloosa)
              </label>

              <label>
                <input
                  type="radio"
                  name="local"
                  value="estrada_atem"
                  onChange={(e) => setLocal(e.target.value)}
                />
                Estrada (R$ 10, até o Posto ATEM)
              </label>

              <label>
                <input
                  type="radio"
                  name="local"
                  value="km26"
                  onChange={(e) => setLocal(e.target.value)}
                />
                KM26 (R$ 20)
              </label>

              <label>
                <input
                  type="radio"
                  name="local"
                  value="vila"
                  onChange={(e) => setLocal(e.target.value)}
                />
                Vila (R$ 2)
              </label>

              <label>
                <input
                  type="radio"
                  name="local"
                  value="jutai"
                  onChange={(e) => setLocal(e.target.value)}
                />
                Jutaí (R$ 3)
              </label>
            </div>
          )}

          <div className="form-section">
            <h2>Forma de pagamento</h2>

            <label>
              <input
                type="radio"
                name="pagamento"
                value="pix"
                onChange={(e) => setPagamento(e.target.value)}
              />
              Pix
            </label>

            <label>
              <input
                type="radio"
                name="pagamento"
                value="dinheiro"
                onChange={(e) => setPagamento(e.target.value)}
              />
              Dinheiro
            </label>

            <label>
              <input
                type="radio"
                name="pagamento"
                value="credito"
                onChange={(e) => setPagamento(e.target.value)}
              />
              Cartão de crédito (+4,98%)
            </label>

            <label>
              <input
                type="radio"
                name="pagamento"
                value="debito"
                onChange={(e) => setPagamento(e.target.value)}
              />
              Cartão de débito (+1,99%)
            </label>
          </div>

          <div className="form-section">
            <h2>Observações do pedido</h2>

            <textarea
              placeholder="Ex: sem cebola, sem tomate, ponto da carne, etc..."
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
                  {troco < 0
                    ? "Valor insuficiente!"
                    : `Troco: R$ ${troco.toFixed(2)}`}
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

              <small>
                O valor já está preenchido. Após pagar, envie o comprovante no
                WhatsApp.
              </small>
            </div>
          )}

          {/* TOTAL */}
          <div className="cart-total">
            <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
            <p>Entrega: R$ {taxaEntrega}</p>
            <p>Taxa da maquininha: R$ {taxaPagamento.toFixed(2)}</p>
            <h2>Total: R$ {totalFinal.toFixed(2)}</h2>
          </div>

          {/* AÇÕES */}
          <div className="cart-buttons">
            <button className="btn-clear" onClick={clearCart}>
              Limpar Carrinho
            </button>

            <button
              className="btn-finish"
              onClick={finalizarPedido}
              disabled={!isFormValid}
            >
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Carrinho;
