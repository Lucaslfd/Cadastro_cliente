import { useState } from 'react';
import './home.css';
import api from '../../services/api';
import { toast } from 'react-toastify';


export default function Home() {
    // const [clientes, setClientes] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // If para verificar se tem campo vazio
        if (nome !== "" && cpf !== "" && email !== "" && telefone !== "" && dataNasci !== "" && cep !== "" && logradouro !== "" && complemento !== "" && bairro !== "" && cidade !== "" && estado !== "") {
            //CADASTRAR UM NOVO ENDEREÇO
            const novoCep = {
                cep: cep,
                logradouro: logradouro,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado
            };
        
            api.post('/endereco', novoCep)
                .then(response1 => {
                    console.log('Cliente cadastrado com sucesso:', response1.data);
        
                    //BUSCAR O NOVO ENDEREÇO
                    return api.get(`/endereco/cep/${cep}`);
                })
                .then(enderecoCriado => {
                    // CADASTRAR UM NOVO CLIENTE
                    const novoCliente = {
                        nome: nome,
                        cpf: cpf,
                        email: email,
                        telefone: telefone,
                        data_nascimento: dataNasci,
                        endereco_id: enderecoCriado.data.id
                    };
        
                    return api.post('/cliente', novoCliente);
                })
                .then(response => {
                    toast.success('Cliente cadastrado com sucesso');
                })
                .catch(error => {
                    toast.error('Erro ao cadastrar cliente');
                });
        
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
        } else {
            toast.error('Todos os campos devem ser completados');
        }
    };
    

    return (
        <div className="container">
            <h1>Cadastrar Novo Cliente</h1>
            <div>
                <form onSubmit={handleSubmit} className='input-container'>
                    <div className='input-sors'>
                        <div className='input'>
                            <div className='form-inputs'>
                                <label>Nome: </label>
                                <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" />
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
                    <button className='btn-cad'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

                    