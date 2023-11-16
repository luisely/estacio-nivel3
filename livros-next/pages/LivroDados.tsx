import { controleEditora } from "@/classes/controle/ControleEditora";
import { Livro } from "@/classes/modelo/Livro";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles/Home.module.css'
import { Menu } from "@/components/Menu";

const LivroDados: NextPage = () => { 
  const router = useRouter();
  const baseURL = "http://localhost:3000/api/livros"

  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const incluirLivro = async(livro: Livro) => {
    try {
      const response = await fetch(baseURL, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro)
      })

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao incluir livro:', error);
      return false;
    }
  }

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoCodEditora = Number(event.target.value);
    setCodEditora(novoCodEditora);
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const novoLivro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };

    const sucesso = await incluirLivro(novoLivro);

    if (sucesso) {
      router.push('/LivroLista');
    } else {
      console.error('Erro ao incluir o livro.');
    }
  };
  
  
  return (
    <>
      <Head>
        <title>Página de Livros</title>
      </Head>
    
      <div className={styles.container} >

      <Menu paginaAtiva="LivroDados" />

      <main>
        <h1>Adicionar Livro</h1>
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
      </div>
    </>
  )

}


export default LivroDados;