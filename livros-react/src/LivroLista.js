import { useState, useEffect } from 'react';

import { controleEditora } from './controle/ControleEditora';
import { controleLivro } from './controle/ControleLivros';


const LinhaLivro = ({ livro, excluir }) => {
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        <p>{livro.titulo}</p>
        <button className='btn btn-danger' onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const carregarLivros = async () => {
      const livrosCarregados = controleLivro.obterLivros();
      setLivros(livrosCarregados);
      setCarregado(true);
    };

    carregarLivros();
  }, [carregado]);

  const excluir = (codigoLivro) => {
    controleLivro.excluir(codigoLivro);
    setCarregado(false); 
  };

  return (
    <main>
      <h1>Lista de Livros</h1>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Resumo</th>
            <th scope="col">Editora</th>
            <th scope="col">Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
};

// Exportar LivroLista por padrão
export default LivroLista;