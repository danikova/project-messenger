const request = require('supertest');
const app = require('../server');
const dbHandler = require('../services/test.database.setup');
const User = require('../api/users/model');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

test('register reject without username', async () => {
    const res = await request(app).post('/auth/register').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.password).toBe(undefined);
});

test('register reject without password', async () => {
    const res = await request(app).post('/auth/register').send({
        username: 'testuser',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.password).toBe(undefined);
});

test('register accept with username and password', async () => {
    const res = await request(app).post('/auth/register').send({
        username: 'testuser',
        password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.password).toBe(undefined);
});

test('register reject user register with equal authentication data', async () => {
    const res1 = await request(app).post('/auth/register').send({
        username: 'testuser',
        password: 'password123',
    });
    expect(res1.statusCode).toEqual(201);
    const res2 = await request(app).post('/auth/register').send({
        username: 'testuser',
        password: 'password123',
    });
    expect(res2.statusCode).toEqual(400);
    expect(res1.body.password).toBe(undefined);
    expect(res2.body.password).toBe(undefined);
});

test('login with invalid data', async () => {
    await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const res = await request(app).post('/auth/login').send({
        username: 'asdasd',
        password: 'asdasd',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.password).toBe(undefined);
});

test('login with valid data', async () => {
    await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const res = await request(app).post('/auth/login').send({
        username: 'testuser',
        password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe('testuser');
    expect(res.body.password).toBe(undefined);
});
