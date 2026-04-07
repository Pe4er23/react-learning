const ProductActions = ({ quantity, onIncrease, onDecrease, onBuy }) => (
  <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
    <div>
      <button onClick={onDecrease} disabled={quantity <= 1}>-</button>
      <span style={{ margin: "0 15px", fontWeight: "bold" }}>{quantity}</span>
      <button onClick={onIncrease}>+</button>
    </div>
    <Button onClick={onBuy}>Додати в кошик</Button>
  </div>
);