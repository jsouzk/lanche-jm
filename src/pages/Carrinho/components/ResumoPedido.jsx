import { formatCurrency } from "../../../utils/formatCurrency";

function ResumoPedido({ subtotal, taxaEntrega, taxaPagamento, totalFinal }) {
  return (
    <div className="cart-total">
      <p><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></p>
      <p><span>Entrega</span><span>{formatCurrency(taxaEntrega)}</span></p>
      <p><span>Taxa maquininha</span><span>{formatCurrency(taxaPagamento)}</span></p>
      <h2><span>Total</span><span>{formatCurrency(totalFinal)}</span></h2>
    </div>
  );
}

export default ResumoPedido;
