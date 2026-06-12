const request = require('supertest');
const app = require('../../src/app');
const mathService = require('../../src/services/mathService');

describe('Math Service', () => {
    describe('Addition', () => {
        it('should return the sum of two numbers', () => {
            const result = mathService.add(2, 3);
            expect(result).toBe(5);
        });
    });

    describe('Subtraction', () => {
        it('should return the difference of two numbers', () => {
            const result = mathService.subtract(5, 3);
            expect(result).toBe(2);
        });
    });

    // Add more tests for other mathService functions as needed
});

describe('API Endpoints', () => {
    it('GET /api/some-endpoint should respond with 200', async () => {
        const response = await request(app).get('/api/some-endpoint');
        expect(response.status).toBe(200);
    });

    // Add more tests for other API endpoints as needed
});