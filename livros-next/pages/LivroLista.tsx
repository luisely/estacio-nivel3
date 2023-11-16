import { Livro } from "@/classes/modelo/Livro";
import { LinhaLivro } from "@/components/LinhaLivro";
import { Menu } from "@/components/Menu";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Head from 'next/head'

const LivroLista: NextPage = () => {
  const [livros, setLivros] = useState<Livro[]>([])
  const [carregado, setCarregado] = useState(false)

  const baseURL = "http://localhost:3000/api/livros" 

  const obter = async() => {
    try {
      const response = await fetch(baseURL);
  
      if (response.ok) {
        const dados = await response.json();
        return dados
      } else {
        console.error('Erro ao obter dados:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      return null;
    }
  }

  const excluirLivro = async(codigo: number) => {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE',
      });
  
      
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      return false;
    }
  };

  const handleExcluirLivro = async (codigoLivro: number) => {
    try {
      await excluirLivro(codigoLivro);
      // Atualizar os livros após a exclusão
      const dadosObtidos = await obter();
      setLivros(dadosObtidos);
      setCarregado(true)
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };


  useEffect(() => {
    const obterLivros = async () => {
      try {
        const dadosObtidos = await obter();
        setLivros(dadosObtidos);
        setCarregado(true);
      } catch (error) {
        console.error('Erro ao obter livros:', error);
      }
    };

    obterLivros();
  }, []);

  return (
    <>
      <Head>
        <title>Página de Livros</title>
      </Head>
    
      <div className={styles.container} >

      <Menu paginaAtiva="LivroLista"/>

      <main>
        <h1>Página de Livros</h1>
        {carregado ? (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Atores</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <LinhaLivro key={livro.codigo} livro={livro} excluir={() => handleExcluirLivro(livro.codigo)} />
              ))}
            </tbody>
          </table>
        ) : (
          <p>Carregando...</p>
        )}
      </main>
      </div>
    </>
  );

}

export default LivroLista