const ProductDetails = ({ title, description, price, rating }) => (
  <div style={{ marginBottom: "20px" }}>
    <h2>{title}</h2>
    <StarRating rating={rating} />
    <p style={{ color: "#555", marginTop: "10px" }}>{description}</p>
    <h3 style={{ color: "#28a745" }}>{price} ₴</h3>
  </div>
);