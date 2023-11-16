import { useState, useEffect } from 'react';

// a) Fiz o instaciamento direto no controle.
import { controleEditora } from './controle/ControleEditora';
import { controleLivro } from './controle/ControleLivros';


// b)
const LinhaLivro = ({ livro, excluir }) => {
  // c) Invocar o método getNomeEditora
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  // d) Retorno do componente
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

// Definir o componente LivroLista
const LivroLista = () => {
  // h) Definir propriedades livros e carregado
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // i) Utilizar useEffect para carregar livros
  useEffect(() => {
    const carregarLivros = async () => {
      const livrosCarregados = controleLivro.obterLivros();
      setLivros(livrosCarregados);
      setCarregado(true);
    };

    carregarLivros();
  }, [carregado]); // O useEffect será acionado sempre que 'carregado' mudar

  // j) Método excluir
  const excluir = (codigoLivro) => {
    controleLivro.excluir(codigoLivro);
    setCarregado(false); // Força o redesenho da página após a exclusão
  };

  // k) Retorno do componente
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
          {/* l) Utilizar o método map para gerar linhas como componentes LinhaLivro */}
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