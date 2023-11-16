import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '@/classes/controle/ControleLivros';

export default function api(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      const novoLivro = req.body;
      controleLivro.incluir(novoLivro);
      res.status(200).json({ mensagem: 'Livro incluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};