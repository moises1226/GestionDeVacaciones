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
import FormularioVacaciones from "./pages/formularioVacaciones.jsx";

// Función de ruta protegida
function RutaProtegida({ estaAutenticado, children }) {
  return estaAutenticado ? children : <Navigate to="/Login" />;
}

function App() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const ubicacion = useLocation();

  const esPaginaDeAutenticacion = ubicacion.pathname === "/Login" || ubicacion.pathname === "/Registro";

  return (
    <div >
      {/* Rutas de autenticación sin Layout */}
      {esPaginaDeAutenticacion ? (
        <Routes>
          <Route path="/Login" element={<Login setEstaAutenticado={setEstaAutenticado} />} />
          <Route path="/Registro" element={<Registro setEstaAutenticado={setEstaAutenticado} />} />
          <Route path="/*" element={<Navigate to="/Login" />} /> {/* Redirige a login si no coincide con ninguna ruta */}
        </Routes>
      ) : (
        // Rutas principales: NavBar y Footer
        <>
          <NavBar />
          <Layout className="flex-grow">
            <Routes>
              {/* Ruta de inicio protegida */}
              <Route path="/" element={
                <RutaProtegida estaAutenticado={estaAutenticado}>
                  <Inicio />
                </RutaProtegida>
              } />
              
              {/* Rutas protegidas */}
              <Route path="/Calendario" element={
                <RutaProtegida estaAutenticado={estaAutenticado}>
                  <Calendario />
                </RutaProtegida>
              } />
              <Route path="/formularioVacaciones" element={
                <RutaProtegida estaAutenticado={estaAutenticado}>
                  <FormularioVacaciones />
                </RutaProtegida>
              } />
              <Route path="/Validacion" element={
                <RutaProtegida estaAutenticado={estaAutenticado}>
                  <Validacion />
                </RutaProtegida>
              } />

              {/* Ruta por defecto */}
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
