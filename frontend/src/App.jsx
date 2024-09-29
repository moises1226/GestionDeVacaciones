import Button from "./components/Button"
import  Layout  from "./components/Layout"
import NavBar from "./components/NavBar"
import {  Navigate, Route, Routes } from "react-router-dom"
import Inicio from "./pages/Inicio"
import SobreMi from "./pages/SobreMi"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Footer from "./components/Footer"

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
          <Route path="/sobreMi" element={<SobreMi/>}></Route>
          <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
          </Routes>  
      </Layout>
      <Footer/>
      </div>
    </>
  )
}

export default App
