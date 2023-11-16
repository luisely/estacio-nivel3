import { Livro } from "../modelo/Livro";

const livros: Livro[] = [
  { codigo: 1, codEditora: 130, titulo: 'A Revanche', resumo: 'O ex-detetive Max busca vingança pela brutal morte de sua esposa e filha. Mergulhando no submundo do crime de Nova York, enfrenta conspirações, traições e usa o tempo lento em tiroteios, desvendando uma trama sombria e pessoal num envolvente thriller noir.', autores: ['Max Payne', 'Mona Sax'] },
  { codigo: 2, codEditora: 140, titulo: 'A Escuridão', resumo: 'O escritor Alan busca sua esposa desaparecida em uma cidade sombria. Enfrenta criaturas das trevas, inspiradas em seus próprios romances, enquanto descobre mistérios sobrenaturais, explorando os limites entre ficção e realidade, num tenso thriller psicológico.', autores: ['Alan Wake'] },
  { codigo: 3, codEditora: 150, titulo: 'Vivendo em 1899', resumo: 'John Marston, ex-fora da lei, é forçado a caçar membros de sua antiga gangue. Em um Velho Oeste vasto e brutal, ele enfrenta dilemas morais, caçadores de recompensas e desafios, buscando redenção em uma narrativa épica de traição e honra.', autores: ['Arthur Morgan'] },
];

export class ControleLivro {
  private livros: Livro[];

  constructor(livros: Livro[]) {
      this.livros = livros;
  }

  obterLivros(): Livro[] {
    return this.livros;
  }

  incluir(novoLivro: Livro): void {
      const codigoMaisAlto = Math.max(...this.livros.map(livro => livro.codigo), 0);

      novoLivro.codigo = codigoMaisAlto + 1;

      this.livros.push(novoLivro);
  }

  excluir(codigoLivro: number): void {
      const indiceLivro = this.livros.findIndex(livro => livro.codigo === codigoLivro);

      if (indiceLivro !== -1) {
          this.livros.splice(indiceLivro, 1);
      }
  }
}

export const controleLivro = new ControleLivro(livros);