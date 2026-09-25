import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function EditarProduto() {
    const navegar = useNavigate();
    useEffect(() => {
        const logado = localStorage.getItem("autenticado") === "true";
        if (!logado) navegar("/login", { replace: true });
    }, [navegar]);


    const { id } = useParams()
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estoque, setEstoque] = useState('');
    
    useEffect(() => {
        async function getProduto() {
            try {
                let consulta = await fetch(`https://fakestoreapi.com/products/${id}/`)
                let dadosProduto = await consulta.json()
                setNome(dadosProduto.title);
                setPreco(dadosProduto.price);
                setCategoria(dadosProduto.category);
                setEstoque(dadosProduto.rating.count);
            } catch (erro) {
                alert(`Erro ao buscar dados: ${erro}`);

            }
        }
        getProduto();
    }, [id])

    async function editarProduto(event) {
        // Evita que a página seja recarregada ao submeter o formulário
        event.preventDefault();
        console.log(`O formulário foi enviado`);

        // construindo o objeto aluno
        let produto = {
            nome: nome,
            preco: preco,
            categoria: categoria,
            estoque: estoque
        }
        // transformou o objeto aluno em formato de string JSON
        produto = JSON.stringify(produto);
        // enviamos de forma assíncrona para o backend
        try {
            let cadastro = await fetch('http://localhost:8081/editarProduto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: produto
            })
            if (cadastro.sucesso) {
                alert(`Produto cadastrado com sucesso`);
            }

        } catch (erro) {
            alert(`Erro ao cadastrar Produto: ${erro}`);
        }

    }

    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Editar Produto</h1>
                </div>

                <form onSubmit={editarProduto} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="form-control" id="nome" name="nome" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="preco" className="form-label">Preço:</label>
                        <input value={preco} onChange={(e) => setPreco(e.target.value)} type="text" className="form-control" id="preco" name="preco" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="categoria" className="form-label">Categoria:</label>
                        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} type="text" className="form-control" id="categoria" name="categoria" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="estoque" className="form-label">Estoque:</label>
                        <input value={estoque} onChange={(e) => setEstoque(e.target.value)} type="text" className="form-control" id="estoque" name="estoque" />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success">Editar Produto</button>
                        <Link to={`/home`} className="btn btn-danger ms-2">Cancelar</Link>
                    </div>
                </form>

            </main>
        </>
    )
}
export default EditarProduto;