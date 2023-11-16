import { Editora } from "../modelo/Editora";

const editoras: Editora[] = [
  { codEditora: 130, nome: 'Editora Quadrada' },
  { codEditora: 140, nome: 'Editora Triangular' },
  { codEditora: 150, nome: 'Editora Circular' },
];

export class ControleEditora {
  private editoras: Editora[];

  constructor(editoras: Editora[]) {
    this.editoras = editoras;
  }

  getEditoras(): Editora[] {
    return this.editoras;
  }

  getNomeEditora(codEditora: number): string | undefined {
    const editoraEncontrada = this.editoras.filter(editora => editora.codEditora === codEditora)[0];

    return editoraEncontrada ? editoraEncontrada.nome : undefined;
  }
}

export const controleEditora = new ControleEditora(editoras);