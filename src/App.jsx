import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CharacterDetail from "./components/CharacterDetail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {/* Ruta pública: Login */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      {/* Ruta protegida: Home */}
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/login" replace />} />

      {/* Ruta de detalles del personaje */}
      <Route path="/character/:id" element={<CharacterDetail />} />

      {/* Ruta de Creación/Edición */}
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default App;
