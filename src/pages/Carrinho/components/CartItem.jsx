import { formatCurrency } from "../../../utils/formatCurrency";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const cartKey = item.cartId || String(item.id);

  return (
    <div className="cart-item">
      <div className="cart-info">
        <h3>{item.nome}</h3>
        {item.comboPizzas?.length > 0 ? (
          <div className="cart-detail combo-detail">
            {item.comboPizzas.map((pizza) => (
              <span key={`${item.cartId}-${pizza.label}`}>{pizza.label}: {pizza.sabor}</span>
            ))}
          </div>
        ) : (
          item.sabores && <p className="cart-detail">Sabores: {item.sabores}</p>
        )}
        <div className="qty-control">
          <button onClick={() => onDecrease(cartKey)} aria-label={`Diminuir ${item.nome}`}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(cartKey)} aria-label={`Aumentar ${item.nome}`}>
            +
          </button>
        </div>
      </div>

      <div className="cart-actions">
        <span>{formatCurrency(item.preco * item.quantity)}</span>
        <button className="btn-remove" onClick={() => onRemove(cartKey)}>
          Remover
        </button>
      </div>
    </div>
  );
}

export default CartItem;
