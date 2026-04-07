1. Конфігурація AuthContext.jsx
```jsx
import { createContext, useState } from "react";

// Створення контексту
export const AuthContext = createContext();

// Компонент-провайдер
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

```

2. Реалізація компонента ProtectedRoute.jsx
```jsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // replace: true є критично важливим для чистоти історії браузера
    return <Navigate to={redirectPath} replace />;
  }

  // Якщо компонент має children, рендеримо їх, інакше рендеримо Outlet для вкладених маршрутів
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
```

* * Відповіді на контрольні запитання

1) Яку архітектурну проблему (пов'язану з передачею пропсів) вирішує використання Context API?
Context API вирішує проблему "prop drilling" (свердління пропсів). Це ситуація, коли дані потрібно передати глибоко по дереву компонентів, і для цього доводиться прокидати їх як пропси через багато проміжних компонентів, які самі ці дані не використовують. Контекст дозволяє зробити стан "глобальним" і отримувати до нього доступ безпосередньо з будь-якого компонента.

2) Чому для глобального управління станом у складних додатках іноді обирають Redux/Zustand замість вбудованого Context API?
Хоча Context API зручний, він має особливість: при зміні значення контексту React примусово перерендерює усі компоненти, які його споживають. У великих додатках це може викликати проблеми з продуктивністю. Бібліотеки на кшталт Redux або Zustand мають оптимізовані механізми (вони оновлюють лише ті компоненти, дані яких реально змінилися), а також пропонують потужні інструменти розробника (DevTools) і зручну роботу з асинхронними екшенами (middleware).

3) Яка роль патерна Higher-Order Component (HOC) при реалізації захищених маршрутів (Protected Routes)?
HOC виступає в ролі "охоронця" (Guard). Він огортає цільові компоненти або сторінки (наприклад, через <Outlet />) і інкапсулює в собі логіку перевірки прав доступу. Перед тим як відрендерити вкладений контент, HOC перевіряє стан isAuthenticated. Якщо доступ є — пропускає далі, якщо ні — блокує рендер і перенаправляє користувача. Це дозволяє тримати логіку безпеки ізольованою від візуальних компонентів.

4) Чому при перенаправленні неавторизованого користувача використовується властивість replace: true у компоненті Maps? (Поясніть вплив на стек історії браузера).
Властивість replace: true вказує маршрутизатору замінити поточний запис у стеку історії браузера на новий (наприклад, на /login), замість того щоб додавати його поверх поточного. Якби ми використали стандартний перехід (push), то після редиректу користувач міг би натиснути кнопку "Назад" у браузері, знову потрапити на захищений маршрут, знову не пройти перевірку і знову бути перенаправленим на логін — утворивши нескінченний цикл. replace вирішує цю проблему, зберігаючи історію чистою.