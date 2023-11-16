import { controleEditora } from '@/classes/controle/ControleEditora';
import { NextApiRequest, NextApiResponse } from 'next';

export default function CodEditora(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const codEditora = Number(req.query.codEditora);
      const nomeEditora = controleEditora.getNomeEditora(codEditora); // Certifique-se de implementar o método getNomeEditora
      res.status(200).json({ nome: nomeEditora });
    } else {
      res.status(405).end(); // Método não permitido
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(); // Exceção no servidor
  }
};