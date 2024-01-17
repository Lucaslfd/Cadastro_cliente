import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import "./clientes.css";
import { toast } from 'react-toastify';


export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
    
    useEffect(() => {
        //Funcao para listar os clientes
        function listarClientes() {
            api.get('/cliente')
                .then(response => {
                    setClientes(response.data);
                })
                .catch(error => {
                    console.error('Erro ao listar clientes:', error);
                });
        }
    
        //Funcao para listar os enderecos
        function listarEnderecos() {
            api.get('/endereco')
                .then(response => {
                    setEnderecos(response.data);
                })
                .catch(error => {
                    console.error('Erro ao listar enderecos:', error);
                });
        }
    
        listarClientes();
        listarEnderecos();
    }, []);
    
    // Função para excluir cliente/endereco
    function excluirCliente(id) {
        api.delete(`/endereco/${id}`)
            .then(response => {
                window.location.reload();
                console.log(response.data);
                toast.success("Cliente excluido")
            })
            .catch(error => {
                console.error('Erro ao excluir endereco:', error);
            });
    
        api.delete(`/cliente/${id}`)
            .then(response => {
                window.location.reload();
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erro ao excluir cliente:', error);
            });
    }
    
    

    return (
        <div className="container">
            <h3>Tabela de clientes Registrados</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>N.</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Opcoes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map((cliente, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{cliente[1]} </td>
                                    <td>{cliente[2]} </td>
                                    <td>{cliente[4]} </td>
                                    <td className='table-btn'>
                                        <Link className='btn-detalhes' to={`/views/${cliente[0]} `}>Detalhes</Link>
                                        <Link className='btn-editar' to={`/edit/${cliente[0]} `}>Editar</Link>
                                        <button onClick={() => excluirCliente(JSON.stringify(cliente[0]).replace(/^"(.*)"$/, '$1'))}>Excluir</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
    
                </tbody>
            </table>
        </div>
    );
}