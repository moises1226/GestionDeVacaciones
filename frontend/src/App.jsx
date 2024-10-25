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
      <div className="bg-primary min-h-screen">

     
      <NavBar/>
      <Layout>
         <Routes>
          <Route path="/" element={<Inicio/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Registro" element={<Registro/>}></Route>
          <Route path="/Calendario" element={<Calendario/>}></Route>
          <Route path="/formularioVacaciones" element={<FormularioVacaciones/>}></Route>
          <Route path="/Validacion" element={<Validacion/>}></Route>
          <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
          </Routes>  
      </Layout>
      <Footer/>
      </div>
    </>
  )
}

export default App
