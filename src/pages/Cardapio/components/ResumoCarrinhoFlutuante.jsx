import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import { formatCurrency } from "../../../utils/formatCurrency";

function ResumoCarrinhoFlutuante({ cart }) {
  const totalItens = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);

  if (totalItens === 0) return null;

  return (
    <Link className="floating-cart" to="/carrinho">
      <FaShoppingCart aria-hidden="true" />
      <span>
        Ver carrinho
        <strong>{totalItens} item(ns) - {formatCurrency(total)}</strong>
      </span>
    </Link>
  );
}

export default ResumoCarrinhoFlutuante;
