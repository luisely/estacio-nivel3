import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { controleEditora } from "./controle/ControleEditora";
import { controleLivro } from "./controle/ControleLivros";

export function LivroDados() {
  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const navigate = useNavigate();

  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const novoLivro = {
      codigo: 0,
      codEditora,
      titulo,
      resumo,
      autores: autores.split('\n').map(author => author.trim()),
    };
    controleLivro.incluir(novoLivro);
    navigate('/');
  };

  return (
    <main className="container">
      <h1 className="mt-4 mb-4">Inclusão de Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título:</label>
          <input type="text" className="form-control" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="resumo" className="form-label">Resumo:</label>
          <textarea className="form-control" id="resumo" value={resumo} onChange={(e) => setResumo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="editora" className="form-label">Editora:</label>
          <select className="form-select" id="editora" value={codEditora} onChange={tratarCombo}>
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="form-label">Autores:</label>
          <textarea className="form-control" id="autores" value={autores} onChange={(e) => setAutores(e.target.value)} />
        </div>
        
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Incluir Livro</button>
        </div>
      </form>
    </main>
  );
}