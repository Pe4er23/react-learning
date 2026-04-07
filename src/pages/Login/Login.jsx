import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// Імпортуйте ваші Input та Button з попередніх лаб

const Login = () => {
  const [email, setEmail] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Імітація перевірки даних (у Лаб №6 тут буде запит до API)
    if (email) {
      login({ email });
      navigate("/profile", { replace: true });
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
      />
      <button type="submit">Увійти</button>
    </form>
  );
};

export default Login;