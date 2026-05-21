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
      <ol className="pix-steps">
        <li>Escaneie o QR Code.</li>
        <li>Ou copie o código Pix.</li>
        <li>Envie o comprovante no WhatsApp.</li>
      </ol>
      <QRCodeCanvas value={payloadPix} size={180} />
      <div className="pix-copy">
        <span>{payloadPix}</span>
        <button type="button" onClick={copiarCodigo}>
          {copiado ? "Copiado" : "Copiar código"}
        </button>
      </div>
      <small>O valor já está preenchido no código Pix.</small>
    </div>
  );
}

export default PixBox;
