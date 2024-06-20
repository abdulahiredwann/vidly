const request = require('supertest')
const { User } = require('../../model/user');
const { Genre } = require('../../model/genres');
let server;
describe('auth middleware', () => {
    beforeEach(async () => {
        server = require('../../index'); // Start the server before each test
        process.env.NODE_ENV = 'test';
    });
    afterEach(async () => {
        await server.close();
        await Genre.deleteMany({});
    })
    let token;
    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' })
    }
    beforeEach(() => {
        // Generate a valid token for a test user
        token = new User().generateAuthToken();
    });

    it('should return 401 if no token is provided', async () => {
        // Set token to null to simulate no token being provided
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        // Set token to a string that is not a valid JWT to simulate an invalid token
        token = 'invalid token';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if a valid token is provided', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});