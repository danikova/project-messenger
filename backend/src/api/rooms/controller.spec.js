const request = require('supertest');
const app = require('../../server');
const dbHandler = require('../../shared/db.handler.for.tests');
const User = require('../users/model');
const Room = require('./model');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

test('create new room', async () => {
    const user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const res = await request(app)
        .post('/api/rooms')
        .set('x-access-token', user.generateAuthToken())
        .send({
            name: 'testroom',
        });
    expect(res.statusCode).toEqual(201);
    expect(res.body.activeUsers.length).toEqual(1);
});

test('create new rooms with same name', async () => {
    const user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    for (let i = 0; i < 10; i++) {
        const res = await request(app)
            .post('/api/rooms')
            .set('x-access-token', user.generateAuthToken())
            .send({
                name: 'testroom',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.activeUsers.length).toEqual(1);
    }
});

test('get room list without user lists and with only just the last messages', async () => {
    const user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    for (let i = 0; i < 20; i++) {
        const room = await Room.create({ name: i });
        await room.addUser(user);
        for (let j = 0; j < 20; j++)
            await room.pushMessage({ userId: user._id, message: j });
        room.save();
    }
    const res = await request(app)
        .get('/api/rooms')
        .set('x-access-token', user.generateAuthToken())
        .send();
    expect(res.statusCode).toEqual(200);
    let lastRoomName = 20;
    for (const room of res.body) {
        expect(room.messages.length).toEqual(1);
        expect(room.messages[0].message).toEqual('19');
        expect(room.activeUsers).toEqual(undefined);
        const currentRoomName = parseInt(room.name);
        expect(currentRoomName < lastRoomName).toEqual(true);
        lastRoomName = currentRoomName;
    }
});

test('get room list with populated message.user', async () => {
    const user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const room = await Room.create({ name: 'test' });
    await room.addUser(user);
    await room.pushMessage({ userId: user._id, message: 'first' });
    room.save();
    const res = await request(app)
        .get('/api/rooms')
        .set('x-access-token', user.generateAuthToken())
        .send();
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body[0].messages[0].user).toEqual('object');
});

test('get room list but response contains only rooms where user is in it', async () => {
    const user1 = await User.create({
        username: 'testuser1',
        password: 'password123',
    });
    const user2 = await User.create({
        username: 'testuser2',
        password: 'password123',
    });
    const room1 = await Room.create({ name: 'test1' });
    await room1.addUser(user1);
    room1.save();
    const room2 = await Room.create({ name: 'test2' });
    await room2.addUser(user1);
    room2.save();
    const room3 = await Room.create({ name: 'test3' });
    await room3.addUser(user2);
    room3.save();

    const res1 = await request(app)
        .get('/api/rooms')
        .set('x-access-token', user1.generateAuthToken())
        .send();
    expect(res1.statusCode).toEqual(200);
    expect(res1.body.length).toEqual(2);

    const res2 = await request(app)
        .get('/api/rooms')
        .set('x-access-token', user2.generateAuthToken())
        .send();
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.length).toEqual(1);
});

test('get room by id', async () => {
    const user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    let lastRoom;
    for (let i = 0; i < 20; i++) {
        lastRoom = await Room.create({ name: 'test' });
        await lastRoom.addUser(user);
        for (let j = 0; j < 20; j++)
            await lastRoom.pushMessage({ userId: user._id, message: j });
        lastRoom.save();
    }
    const res = await request(app)
        .get(`/api/rooms/${lastRoom.id}`)
        .set('x-access-token', user.generateAuthToken())
        .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.activeUsers.length).toEqual(1);
    for (const user of res.body.activeUsers) {
        expect(typeof user).toEqual('string');
    }
    expect(res.body.messages.length).toEqual(20);
    for (const message of res.body.messages) {
        expect(typeof message).toEqual('object');
    }
});

test('get room by id when user not in it return empty object', async () => {
    const user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const room = await Room.create({ name: 'test' });
    const res = await request(app)
        .get(`/api/rooms/${room.id}`)
        .set('x-access-token', user.generateAuthToken())
        .send();
    expect(res.statusCode).toEqual(200);
    expect(JSON.stringify(res.body)).toEqual('{}');
});

test('test add-user route with invalid room id', async () => {
    const user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const res = await request(app)
        .post(`/api/rooms/invalid/add-user`)
        .set('x-access-token', user.generateAuthToken())
        .send();
    expect(res.statusCode).toEqual(400);
});

test('test add-user route with invalid user id', async () => {
    const user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const room = await Room.create({ name: 'test' });
    await room.addUser(user);
    const res = await request(app)
        .post(`/api/rooms/${room.id}/add-user`)
        .set('x-access-token', user.generateAuthToken())
        .send({
            username: 'invalid',
        });
    expect(res.statusCode).toEqual(400);
});

test('test add-user route with valid parameters', async () => {
    const user1 = await User.create({
        username: 'testuser1',
        password: 'password123',
    });
    const user2 = await User.create({
        username: 'testuser2',
        password: 'password123',
    });
    const room = await Room.create({ name: 'test' });
    await room.addUser(user1);
    room.save();
    const res1 = await request(app)
        .post(`/api/rooms/${room.id}/add-user`)
        .set('x-access-token', user1.generateAuthToken())
        .send({
            username: user2.username,
        });
    expect(res1.statusCode).toEqual(200);
    const res2 = await request(app)
        .get(`/api/rooms/${room.id}`)
        .set('x-access-token', user1.generateAuthToken())
        .send();
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.activeUsers.length).toEqual(2);
});

// test('test remove-user', async () => {
//     const user1 = await User.create({
//         username: 'testuser1',
//         password: 'password123',
//     });
//     const user2 = await User.create({
//         username: 'testuser2',
//         password: 'password123',
//     });
//     const room = await Room.create({ name: 'test' });
//     await room.addUser(user1);
//     await room.addUser(user2);
//     room.save();
//     const res1 = await request(app)
//         .post(`/api/rooms/${room.id}/remove-user`)
//         .set('x-access-token', user1.generateAuthToken())
//         .send({
//             userId: user2.id,
//         });
//     expect(res1.statusCode).toEqual(200);
//     const res2 = await request(app)
//         .get(`/api/rooms/${room.id}`)
//         .set('x-access-token', user1.generateAuthToken())
//         .send();
//     expect(res2.statusCode).toEqual(200);
//     expect(res2.body.activeUsers.length).toEqual(1);
// });

// test('test remove last user may delete the room', async () => {
//     const user = await User.create({
//         username: 'testuser',
//         password: 'password123',
//     });
//     const room = await Room.create({ name: 'test' });
//     await room.addUser(user);
//     room.save();
//     const res1 = await request(app)
//         .post(`/api/rooms/${room.id}/remove-user`)
//         .set('x-access-token', user.generateAuthToken())
//         .send({
//             userId: user.id,
//         });
//     expect(res1.statusCode).toEqual(200);
//     const res2 = await request(app)
//         .get(`/api/rooms/${room.id}`)
//         .set('x-access-token', user.generateAuthToken())
//         .send();
//     expect(res2.statusCode).toEqual(200);
//     expect(JSON.stringify(res2.body)).toEqual('{}');
// });
