import { controleLivro } from '@/classes/controle/ControleLivros';
import { NextApiRequest, NextApiResponse } from 'next';

export default function codigo(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'DELETE') {
      const codigoLivro = Number(req.query.codigo);
      controleLivro.excluir(codigoLivro);
      res.status(200).json({ mensagem: 'Livro excluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};