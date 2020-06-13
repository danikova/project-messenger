const request = require('supertest');
const app = require('../server');
const dbHandler = require('../shared/db.handler.for.tests');
const User = require('../api/users/model');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

test('sign-up reject without username', async () => {
    const res = await request(app).post('/auth/sign-up').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.password).toBe(undefined);
});

test('sign-up reject without password', async () => {
    const res = await request(app).post('/auth/sign-up').send({
        username: 'testuser',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.password).toBe(undefined);
});

test('sign-up accept with username and password', async () => {
    const res = await request(app).post('/auth/sign-up').send({
        username: 'testuser',
        password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.password).toBe(undefined);
});

test('sign-up reject user register with equal authentication data', async () => {
    const res1 = await request(app).post('/auth/sign-up').send({
        username: 'testuser',
        password: 'password123',
    });
    expect(res1.statusCode).toEqual(201);
    const res2 = await request(app).post('/auth/sign-up').send({
        username: 'testuser',
        password: 'password123',
    });
    expect(res2.statusCode).toEqual(400);
    expect(res1.body.password).toBe(undefined);
    expect(res2.body.password).toBe(undefined);
});

test('sign-in with invalid data', async () => {
    await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const res = await request(app).post('/auth/sign-in').send({
        username: 'asdasd',
        password: 'asdasd',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.password).toBe(undefined);
});

test('sign-in with valid data', async () => {
    await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const res = await request(app).post('/auth/sign-in').send({
        username: 'testuser',
        password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe('testuser');
    expect(res.body.password).toBe(undefined);
});
