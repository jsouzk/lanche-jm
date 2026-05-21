export const storeConfig = {
  whatsappNumber: "5592984525890",
  pixKey: "+5592985892962",
  pixReceiver: "MARCIA DE SOUZA ALBUQUERQUE",
  pixCity: "IRANDUBA",
  schedule: {
    domingo: { open: "18:00", close: "23:00" },
    segunda: null,
    terca: { open: "18:00", close: "23:00" },
    quarta: { open: "18:00", close: "23:00" },
    quinta: { open: "18:00", close: "23:00" },
    sexta: { open: "18:00", close: "23:00" },
    sabado: { open: "18:00", close: "23:00" },
  },
};

export const locaisEntrega = [
  { value: "estrada_lbv", label: "Estrada - até a LBV Telecom", taxa: 3 },
  { value: "estrada_apaloosa", label: "Estrada - até o Apaloosa", taxa: 5 },
  { value: "estrada_atem", label: "Estrada - até o Posto ATEM", taxa: 10 },
  { value: "km26", label: "KM26", taxa: 20 },
  { value: "vila", label: "Vila", taxa: 2 },
  { value: "jutai", label: "Jutaí", taxa: 3 },
  { value: "chacaras_do_limao", label: "Chácaras do Limão", taxa: 3 },
];

export const taxasEntrega = locaisEntrega.reduce((acc, local) => {
  acc[local.value] = local.taxa;
  return acc;
}, {});
