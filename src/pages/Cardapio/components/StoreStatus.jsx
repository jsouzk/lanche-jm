function StoreStatus({ status }) {
  return (
    <div className={`store-status ${status.isOpen ? "open" : "closed"}`}>
      <strong>{status.label}</strong>
      <span>{status.detail}</span>
    </div>
  );
}

export default StoreStatus;
