import { useState, useEffect } from "react";

const ProductContainer = () => {
  // Контейнер тримає стан
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Імітація отримання даних товару
  useEffect(() => {
    setProduct({
      id: 101,
      title: "Бездротові навушники Sony",
      description: "Чудове шумозаглушення та 30 годин автономної роботи.",
      price: 12500,
      rating: 4,
      image: "https://placehold.co/200"
    });
  }, []);

  // Логіка для дій
  const handleBuy = () => {
    alert(`Додано в кошик: ${product.title}, Кількість: ${quantity}, Сума: ${product.price * quantity} ₴`);
  };

  if (!product) return <div>Завантаження товару...</div>;

  return (
    <div style={{ display: "flex", gap: "30px", border: "1px solid #ddd", padding: "20px", maxWidth: "600px", borderRadius: "8px" }}>
      <img src={product.image} alt={product.title} style={{ width: "200px", objectFit: "cover", borderRadius: "8px" }} />
      
      <div>
        {/* Передача даних зверху вниз через props */}
        <ProductDetails 
          title={product.title} 
          description={product.description} 
          price={product.price} 
          rating={product.rating} 
        />
        
        <ProductActions 
          quantity={quantity}
          onIncrease={() => setQuantity(q => q + 1)}
          onDecrease={() => setQuantity(q => q > 1 ? q - 1 : 1)}
          onBuy={handleBuy}
        />
      </div>
    </div>
  );
};

export default ProductContainer;