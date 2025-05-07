import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Clients from "./pages/Clients";
import Products from "./pages/Products";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true",
  );

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container">
      {isAuthenticated && (
        <nav>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      )}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated
            ? <Navigate to="/clients" />
            : <Auth onLogin={handleLogin} />}
        />
        <Route
          path="/clients"
          element={isAuthenticated ? <Clients /> : <Navigate to="/" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <Products /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
