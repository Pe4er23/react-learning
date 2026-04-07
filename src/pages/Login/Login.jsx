import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  // 1. Створюємо стейт для відстеження процесу завантаження
  const [isLoading, setIsLoading] = useState(false); 
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 2. Робимо функцію асинхронною (додаємо async)
  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    if (email) {
      // 3. Вмикаємо стан завантаження перед відправкою запиту
      setIsLoading(true); 
      
      try {
        await login(email); 
        navigate("/profile", { replace: true });
      } catch (error) {
        console.error("Помилка під час входу:", error);
      } finally {
        // 4. Вимикаємо стан завантаження, коли запит завершився
        setIsLoading(false); 
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вхід в систему</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        disabled={isLoading}
      />
      
      {/* 5. Використовуємо isLoading для блокування кнопки та зміни тексту */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Завантаження..." : "Увійти"}
      </button>
    </form>
  );
};

export default Login;