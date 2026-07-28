import request from "supertest"
import app from "../server.js"

describe("GET /api/ping", () =>{
    it('deve responder com pong verdadeiro', async() =>{
        const response = await request(app).get('/api/ping');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({pong: true});
    })
})