import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/templates/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/hoc/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Захищений маршрут */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile/*" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;