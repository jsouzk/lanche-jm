import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function PixBox({ payloadPix }) {
  const [copiado, setCopiado] = useState(false);

  const copiarCodigo = async () => {
    await navigator.clipboard.writeText(payloadPix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  };

  return (
    <div className="pix-box">
      <h3>Pague com Pix</h3>
      <QRCodeCanvas value={payloadPix} size={180} />
      <div className="pix-copy">
        <span>{payloadPix}</span>
        <button type="button" onClick={copiarCodigo}>
          {copiado ? "Copiado" : "Copiar código"}
        </button>
      </div>
      <small>O valor já está preenchido. Após pagar, envie o comprovante no WhatsApp.</small>
    </div>
  );
}

export default PixBox;
