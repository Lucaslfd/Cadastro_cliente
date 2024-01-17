import "./header.css";
import { Link } from "react-router-dom";

// Header da pagina
function Header() {
    return(
        <div className="container-header">
            <Link className="logo" to='/'>Leads Seguradora</Link>
            <div className="pages">
                <Link to='/clientes'>Clientes</Link>
                <Link to='/'>Cadatrar Novo Cliente</Link>
            </div>
        </div>
    )
}

export default Header;