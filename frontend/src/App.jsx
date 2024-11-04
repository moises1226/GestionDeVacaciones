import  Layout  from "./components/Layout"
import NavBar from "./components/NavBar"
import {  Navigate, Route, Routes } from "react-router-dom"
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Footer from "./components/Footer"
import Calendario from "./pages/Calendario"
import Validacion from "./pages/Validacion"
import FormularioVacaciones from "./pages/formularioVacaciones"

function App() {
  return (
    <>
      <div className="bg-primary min-h-screen flex flex-col">
        <NavBar />
        <Layout className="flex-grow">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Calendario" element={<Calendario />} />
            <Route path="/formularioVacaciones" element={<FormularioVacaciones />} />
            <Route path="/Validacion" element={<Validacion />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </div>
      <Footer />
    </>
  );
}

export default App;
