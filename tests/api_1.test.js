import request from 'supertest';
import app, { resetProducts } from '../server.js';

describe('API de Produtos (/api/products)', () => {
  // Limpa o array de produtos antes de CADA teste para garantir o isolamento
  beforeEach(() => {
    resetProducts();
  });

  describe('GET /api/ping', () => {
    it('deve responder com status 200 e pong verdadeiro', async () => {
      const response = await request(app).get('/api/ping');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ pong: true });
    });
  });

  describe('POST /api/products (Criação e Validação)', () => {
    it('deve criar um produto com sucesso (Caminho Feliz - Status 201)', async () => {
      const payload = { name: 'Teclado Mecânico', price: 250.00 };

      const response = await request(app)
        .post('/api/products')
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body.name).toBe(payload.name);
      expect(response.body.price).toBe(payload.price);
    });

    it('deve retornar status 400 se faltar o campo name', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({ price: 100 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Nome e preço são obrigatórios.' });
    });

    it('deve retornar status 400 se o preço for um valor inválido ou negativo', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({ name: 'Mouse Gamer', price: -50 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'O preço deve ser um número positivo.' });
    });
  });

  describe('GET /api/products (Listagem e Filtros)', () => {
    it('deve retornar uma lista vazia quando não houver produtos cadastrados', async () => {
      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(0);
    });

    it('deve filtrar produtos pelo nome via Query Parameter (?search=)', async () => {
      // Criação dos dados iniciais do teste
      await request(app).post('/api/products').send({ name: 'Monitor LED', price: 900 });
      await request(app).post('/api/products').send({ name: 'Mouse Pad', price: 50 });

      const response = await request(app).get('/api/products?search=monitor');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('Monitor LED');
    });
  });

  describe('GET /api/products/:id (Busca por ID)', () => {
    it('deve retornar um produto existente pelo seu ID', async () => {
      const created = await request(app)
        .post('/api/products')
        .send({ name: 'Cadeira Gamer', price: 1200 });

      const productId = created.body.id;

      const response = await request(app).get(`/api/products/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Cadeira Gamer');
    });

    it('deve retornar status 404 para um ID que não existe', async () => {
      const response = await request(app).get('/api/products/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Produto não encontrado.' });
    });
  });

  describe('DELETE /api/products/:id (Remoção)', () => {
    it('deve deletar um produto com sucesso (Status 204 sem corpo)', async () => {
      const created = await request(app)
        .post('/api/products')
        .send({ name: 'Headset', price: 300 });

      const response = await request(app).delete(`/api/products/${created.body.id}`);

      // 204 No Content não deve possuir corpo na resposta
      expect(response.status).toBe(204);

      // Confirmar se ele realmente foi deletado da base
      const checkResponse = await request(app).get(`/api/products/${created.body.id}`);
      expect(checkResponse.status).toBe(404);
    });
  });
});