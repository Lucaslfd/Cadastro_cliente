import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Clientes from '../pages/Clientes'
import Edit from '../pages/Edit'
import Views from '../pages/Views'

export default function RoutesApp() {
    return(
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/clientes" element={ <Clientes/> }/>
            <Route path="/edit/:id" element={ <Edit/> }/>
            <Route path="/views/:id" element={ <Views/> }/>
        </Routes>
    )
}