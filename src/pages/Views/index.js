import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import api from '../../services/api';


export default function Views() {
    const { id } = useParams();
    const [clientes, setCliente] = useState("");
    const [enderecos, setEndereco] = useState("");

    // Funcao para buscar cliente/endereco por id
    useEffect(() => {
        async function fetchData() {
            const response2Cliente = await api.get(`/cliente/${id}`);
            setCliente(response2Cliente.data);

            const responseEndereco = await api.get(`/endereco/id/${response2Cliente.data.id}`);
            setEndereco(responseEndereco.data);
        }

        fetchData();
    }, [id]);


    return (
        <div className="container">
            <h2>Cliente Cadastrado</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>CPF</th>
                        <th>EMAIL</th>
                        <th>TELEFONE</th>
                        <th>DATA DE NASCIMENTO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{clientes.nome}</td>
                        <td>{clientes.cpf}</td>
                        <td>{clientes.email}</td>
                        <td>{clientes.telefone}</td>
                        <td>{clientes.data_nascimento}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table">
                <thead>
                    <tr>
                        <th>CEP</th>
                        <th>LOGRADOURO</th>
                        <th>COMPLEMENTO</th>
                        <th>BAIRRO</th>
                        <th>CIDADE</th>
                        <th>ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{enderecos.cep}</td>
                        <td>{enderecos.logradouro}</td>
                        <td>{enderecos.complemento}</td>
                        <td>{enderecos.bairro}</td>
                        <td>{enderecos.cidade}</td>
                        <td>{enderecos.estado}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}
