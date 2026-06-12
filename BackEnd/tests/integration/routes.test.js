const request = require('supertest');
const app = require('../../src/app');

describe('Integration Tests for Routes', () => {
    it('should return 200 for the root route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should return 404 for non-existent routes', async () => {
        const response = await request(app).get('/non-existent-route');
        expect(response.status).toBe(404);
    });

    // Add more tests for specific routes as needed
});