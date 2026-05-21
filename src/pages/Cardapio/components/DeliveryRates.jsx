import { locaisEntrega } from "../../../config/store";
import { formatCurrency } from "../../../utils/formatCurrency";

function DeliveryRates() {
  return (
    <section className="delivery-rates" aria-label="Taxas de entrega">
      <div>
        <h2>Taxas de entrega</h2>
        <p>Confira o valor antes de finalizar o pedido.</p>
      </div>

      <ul>
        {locaisEntrega.map((local) => (
          <li key={local.value}>
            <span>{local.label}</span>
            <strong>{formatCurrency(local.taxa)}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DeliveryRates;
