import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
function ListarProduto() {

    const [listaALuno, setListaAluno] = useState([]);

    useEffect(() => {
        async function getProdutos() {
            try {
                const busca = await fetch("https://fakestoreapi.com/products");
                const dadosUsuario = await busca.json();
                setListaAluno(dadosUsuario);
                console.log("Sucesso ao carregar alunos");
            } catch (error) {
                console.error(error);
            }
        }
        getProdutos(); 
    }, []);      

    function excluirAluno(id) {
        // Criar a função POST para excluir dados
        console.log(`O usuário deseja excluir o aluno: ${id}`);
    }
    return (
        <>

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Produtos Cadastrados</h1>
            </div>

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Pesquisar produto" aria-label="Recipient’s username" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Pesquisar</button>
            </div>
            <table className="table table-light table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID:</th>
                        <th>Nome:</th>
                        <th>Preço:</th>
                        <th>Estoque:</th>
                        <th>Ações</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        listaALuno.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.title}</td>
                                <td>{aluno.price}</td>
                                <td>{aluno.rating.count}</td>
                                <td>
                                    <Link onClick={() => excluirAluno(aluno.id)} className="me-2">Excluir</Link>
                                    <Link to={`/editar-produto/${aluno.id}`}><i className="bi bi-pencil-square">Editar</i></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


        </>
    )
}
export default ListarProduto;