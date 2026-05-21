const dayKeys = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

const toMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const getStoreStatus = (schedule, now = new Date()) => {
  const dayKey = dayKeys[now.getDay()];
  const today = schedule[dayKey];

  if (!today?.open || !today?.close) {
    return { isOpen: false, label: "Fechado hoje", detail: "Consulte o horário de atendimento." };
  }

  const current = now.getHours() * 60 + now.getMinutes();
  const open = toMinutes(today.open);
  const close = toMinutes(today.close);
  const isOpen = close > open
    ? current >= open && current <= close
    : current >= open || current <= close;

  return {
    isOpen,
    label: isOpen ? "Aberto agora" : "Fechado agora",
    detail: `Atendimento hoje: ${today.open} às ${today.close}`,
  };
};
