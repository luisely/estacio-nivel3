import { controleEditora } from "@/classes/controle/ControleEditora";
import { Livro } from "@/classes/modelo/Livro";
import React from "react"

interface LinhaLivroProps {
  livro: Livro
  excluir: (codigoLivro: number) => void
}

export const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => { 
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
}