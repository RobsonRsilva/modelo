import { Link, useNavigate } from 'react-router-dom';
import ListarProduto from './ListarProduto';
import { useState, useEffect } from "react";


const CadastrarProduto = () => {
       const navegar = useNavigate();
       useEffect(() => {
            const logado = localStorage.getItem("autenticado") === "true";
            if (!logado) navegar("/login", { replace: true });
        }, [navegar]);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');

    return (
        <div>
            <main className="container mt-4">
                <Link to="/home" className="btn btn-secondary mb-3">
                    &larr; Voltar para a Home
                </Link>
                <div className="card">
                    <div className="card-header">
                        <h2>Cadastro de Produto</h2>
                    </div>
                    <div className='container mt-2'>
                        <form onSubmit={''} className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="form-control" id="nome" name="nome" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Sobrenome</label>
                                <input value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} type="text" className="form-control" id="sobrenome" name="sobrenome" />
                            </div>

                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Cadastrar Produto</button>
                            </div>
                        </form>
                    </div>

                    <div className="card-body">
                        <hr className="my-4" />
                        <ListarProduto />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CadastrarProduto;