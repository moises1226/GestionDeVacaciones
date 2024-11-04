import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Calendario from "./pages/Calendario";
import Validacion from "./pages/Validacion";
import FormularioVacaciones from "./pages/FormularioVacaciones";

// Función  de ruta protegida
function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/Login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/Login" || location.pathname === "/Registro";

  return (
    <div className={`min-h-screen flex flex-col ${isAuthPage ? "justify-center items-center bg-gray-100" : "bg-primary"}`}>
      {/* Solo muestra el NavBar si no estás en login o registro */}
      {!isAuthPage && <NavBar />}

      <Layout className={isAuthPage ? "w-full" : "flex-grow"}>
        <Routes>
          {/* Ruta de inicio protegida */}
          <Route path="/" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Inicio />
            </ProtectedRoute>
          } />

          {/* Rutas públicas */}
          <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Registro" element={<Registro setIsAuthenticated={setIsAuthenticated} />} />

          {/* Rutas protegidas */}
          <Route path="/Calendario" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Calendario />
            </ProtectedRoute>
          } />
          <Route path="/formularioVacaciones" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FormularioVacaciones />
            </ProtectedRoute>
          } />
          <Route path="/Validacion" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Validacion />
            </ProtectedRoute>
          } />

          {/* Ruta por defecto */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>

      {/* Solo muestra el Footer si no estás en login o registro */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
