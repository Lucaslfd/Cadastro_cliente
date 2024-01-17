import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Edit() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNasci, setDataNasci] = useState("");
    const [cep, setCep] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const {id}=useParams();
    const [clientes, setCliente] = useState("");
    const [enderecos, setEndereco] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // If para verificar se tem campo vazio
        if (nome !== "" && cpf !== "" && email !== "" && telefone !== "" && dataNasci !== "" && cep !== "" && logradouro !== "" && complemento !== "" && bairro !== "" && cidade !== "" && estado !== ""){
            //EDITAR ENDEREÇO
            const novoCep = {
                cep: cep,
                logradouro: logradouro,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
            };
        
            api.put(`/endereco/${id}`, novoCep)
                .then(response1 => {
                    console.log('Cliente cadastrado com sucesso:', response1.data);
        
                    //BUSCAR O ENDEREÇO
                    return api.get(`/endereco/id/${id}`);
                })
                .then(enderecoCriado => {
        
                    //EDITAR CLIENTE
                    const novoCliente = {
                        nome: nome,
                        cpf: cpf,
                        email: email,
                        telefone: telefone,
                        data_nascimento: dataNasci,
                        endereco_id: enderecoCriado.data.id
                    };
        
                    return api.put(`/cliente/${id}`, novoCliente);
                })
                .then(response => {
                    toast.success("Cliente Editado com sucesso")

                    // Para os INPUTS voltar como vazio
                    setNome("");
                    setCpf("");
                    setEmail("");
                    setTelefone("");
                    setDataNasci("");
                    setCep("");
                    setLogradouro("");
                    setComplemento("");
                    setBairro("");
                    setCidade("");
                    setEstado("");
                })
                .catch(error => {
                    toast.error('Erro ao cadastrar cliente');
                });
        } else {
            toast.error('Todos os campos devem ser completados');
        }
    };


    

    useEffect(() => {
        //Funcao para buscar cliente/endereco por id
        function fetchData() {
            api.get(`/cliente/${id}`)
                .then(response2Cliente => { // Se o cliente for achado por ID
                    setCliente(response2Cliente.data);
    
                    return api.get(`/endereco/id/${response2Cliente.data.id}`);
                })
                .then(responseEndereco => { // Se o endereco for achado por ID
                    setEndereco(responseEndereco.data);
                })
                .catch(error => {// Caso o cliente/endereco nao seja achado por ID
                    console.error('Erro ao buscar dados:', error);
                });
        }
    
        fetchData();
    }, [id]);
    


    

    return (
        <div className="container">
            <h1>Editar Cliente: {clientes.nome} </h1>
            <div>
            <form onSubmit={handleSubmit} className='input-container'>
                    <div className='input-sors'>
                        <div className='input'>
                            <div className='form-inputs'>
                                <label>Nome: </label>
                                <input value={nome}  onChange={(e) => setNome(e.target.value)} type="text" />
                            </div>

                            <div className='form-inputs'>
                                <label>CPF: </label>
                                <input value={cpf} onChange={(e) => setCpf(e.target.value)} type="text" />
                            </div>

                            <div className='form-inputs'>
                                <label>Email: </label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                            </div>

                            <div className='form-inputs'>
                                <label>Telefone: </label>
                                <input value={telefone} onChange={(e) => setTelefone(e.target.value)} type="text" />
                            </div>

                            <div className='form-inputs'>
                                <label>Data de Nascimento: </label>
                                <input value={dataNasci} onChange={(e) => setDataNasci(e.target.value)} type="date" />
                            </div>
                        </div>
                        <div className='input'>
                            <div className='form-inputs'>
                                <label name="cep">CEP: </label>
                                <input value={cep} onChange={(e) => setCep(e.target.value)} name="cep" type="text" />
                            </div>
                            
                            <div className='form-inputs'>
                                <label name="logradouro">Logradouro: </label>
                                <input value={logradouro} onChange={(e) => setLogradouro(e.target.value)} name="logradouro" type="text" />
                            </div>

                            <div className='form-inputs'>
                                <label name="complemento">Complemento: </label>
                                <input value={complemento} onChange={(e) => setComplemento(e.target.value)} name="complemento" type="text" />
                            </div>


                            <div className='form-inputs'>
                                <label name="bairro">Bairro: </label>
                                <input value={bairro} onChange={(e) => setBairro(e.target.value)} name="bairro" type="text" />
                            </div>

                            <div className='form-inputs'>
                                <label name="cidade">Cidade: </label>
                                <input value={cidade} onChange={(e) => setCidade(e.target.value)} name="cidade" type="text" />
                            </div>

                            <div className='form-inputs'>
                                <label name="estado">Estado: </label>
                                <input value={estado} onChange={(e) => setEstado(e.target.value)} name="estado" type="text" />
                            </div>
                        </div>
                    </div>
                    <button className='btn-cad'>Editar</button>
                    <Link className='btn-cancel' to="/clientes">Cancelar</Link>
                </form>
            </div>
        </div>
    );
}

                    