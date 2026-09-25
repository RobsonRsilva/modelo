import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAutenticado }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navegar = useNavigate();

    const tratarLogin = (evento) => {
        evento.preventDefault();
        if (usuario === "Robson" && senha === "admin") {
            setAutenticado(true);
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('autenticado', 'true');
            navegar(`/home`);
        } else {
            alert('Usuário ou senha inválidos!');
        }
    };

    return (
        <>
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="card shadow" style={{ width: '400px' }}>
                    <div className="card-header text-center">
                        <h3>Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={tratarLogin}>
                            <div className="mb-3">
                                <label className="form-label">Usuário:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Senha:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;