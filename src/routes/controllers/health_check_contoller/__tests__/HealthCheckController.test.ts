import request from "supertest";
import app from "../../../../app";

describe('HealthCheckController Endpoints', () => {
    it('GET /api/health-check', async () => {
        const res = await request(app)
            .get('/api/health-check/')
            .send();
        expect(res.status).toEqual(200);
        expect(res.body.status).toStrictEqual("OK!");
    })
})