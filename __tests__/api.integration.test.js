/**
 * @jest-environment node
 */

const request = require('supertest');

const API_BASE_URL = process.env.API_BASE_URL;
if (!API_BASE_URL) {
    throw new Error('API_BASE_URL environment variable is not set');
}

describe('Login API Endpoint Integration Tests', () => {
    test('POST /Login.php returns 200 and expected JSON structure', async () => {
        const testCredentials = {
            login: 'testuser',
            password: 'testpass'
        };

        const response = await request(API_BASE_URL)
            .post('/Login.php')
            .send(testCredentials)
            .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('firstName');
        expect(response.body).toHaveProperty('lastName');
        expect(typeof response.body.id).toBe('number');
    });
});
