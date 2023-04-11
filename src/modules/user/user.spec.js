const request = require('supertest');
const app = require('../../app');
const User = require('./user.model');

describe('User', () => {
    let user;
    beforeEach(async () => {
        user = await User.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password'
        });
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    describe('GET /api/users/:id', () => {
        it('should return a user if valid id is passed', async () => {
            const res = await request(app).get(`/api/users/${user._id}`).send();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', user.name);
        });

        it('should return 404 error if invalid id is passed', async () => {
            const res = await request(app).get('/api/users/123').send();
            expect(res.status).toBe(404);
        });
    });

    describe('POST /api/users', () => {
        it('should return a 201 response if valid data is passed', async () => {
            const userData = {
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                password: 'password'
            };
            const res = await request(app).post('/api/users').send(userData);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('name', userData.name);
        });

        it('should return a 400 error if invalid data is passed', async () => {
            const userData = {
                name: 'John Doe',
                email: 'not_an_email',
                password: 'password'
            };
            const res = await request(app).post('/api/users').send(userData);
            expect(res.status).toBe(400);
        });
    });

    describe('PATCH /api/users/:id', () => {
        it('should update the user if valid id and data are passed', async () => {
            const updateData = {
                name: 'Updated Name'
            };
            const res = await request(app).patch(`/api/users/${user._id}`).send(updateData);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', updateData.name);
        });

        it('should return 404 error if invalid id is passed', async () => {
            const updateData = {
                name: 'Updated Name'
            };
            const res = await request(app).patch('/api/users/123').send(updateData);
            expect(res.status).toBe(404);
        });

        it('should return 400 error if invalid data is passed', async () => {
            const updateData = {
                name: ''
            };
            const res = await request(app).patch(`/api/users/${user._id}`).send(updateData);
            expect(res.status).toBe(400);
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete the user if valid id is passed', async () => {
            const res = await request(app).delete(`/api/users/${user._id}`).send();
            expect(res.status).toBe(204);
            const deletedUser = await User.findById(user._id);
            expect(deletedUser).toBeNull();
        });

        it('should return 404 error if invalid id is passed', async () => {
            const res = await request(app).delete('/api/users/123').send();
            expect(res.status).toBe(404);
        });
    });
});