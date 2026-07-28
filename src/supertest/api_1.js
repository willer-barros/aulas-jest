import express from 'express';

const app = express();
app.use(express.json());

// Banco de dados em memória para os testes
export let products = [];

// Função auxiliar para resetar o banco nos testes
export const resetProducts = () => {
  products = [];
};

// 1. Rota de Ping
app.get('/api/ping', (req, res) => {
  return res.status(200).json({ pong: true });
});

// 2. Listar produtos (com filtro opcional por query param ?search=)
app.get('/api/products', (req, res) => {
  const { search } = req.query;

  if (search) {
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    return res.status(200).json(filtered);
  }

  return res.status(200).json(products);
});

// 3. Buscar produto por ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }

  return res.status(200).json(product);
});

// 4. Criar produto (com validação)
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'O preço deve ser um número positivo.' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };

  products.push(newProduct);
  return res.status(201).json(newProduct);
});

// 5. Deletar produto
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }

  products.splice(index, 1);
  return res.status(204).send();
});

export default app;