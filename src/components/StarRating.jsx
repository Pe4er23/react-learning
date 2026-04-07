const StarRating = ({ rating }) => {
  return (
    <div style={{ color: "#ffc107", fontSize: "18px" }}>
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </div>
  );
};