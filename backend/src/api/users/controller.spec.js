const request = require('supertest');
const app = require('../../server');
const dbHandler = require('../../services/test.database.setup');
const User = require('./model');
const Rooms = require('../rooms/model');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

// test('get all users without authentication token', async () => {
//     await User.create({
//         username: 'testuser1',
//         password: 'password123',
//     });
//     await User.create({
//         username: 'testuser2',
//         password: 'password123',
//     });
//     const res = await request(app).get('/api/users').send();
//     console.log(res.body);
//     expect(res.statusCode).toEqual(401);
//     expect(res.body.password).toBe(undefined);
// });

// test('get all users with authentication token', async () => {
//     const user = await User.create({
//         username: 'testuser1',
//         password: 'password123',
//     });
//     await User.create({
//         username: 'testuser2',
//         password: 'password123',
//     });
//     const res = await request(app)
//         .get('/api/users')
//         .set('x-access-token', user.generateAuthToken())
//         .send();
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.length).toEqual(2);
//     for (const user of res.body) {
//         expect(user.password).toBe(undefined);
//     }
// });

test('test update self controller', async () => {
    let user = await User.create({
        username: 'testuser',
        password: 'password123',
    });
    const room = await Rooms.create({
        name: 'testroom',
    });
    const res = await request(app)
        .put('/api/users')
        .set('x-access-token', user.generateAuthToken())
        .send({
            openChatroom: room._id,
        });
    expect(res.statusCode).toEqual(200);
    user = await User.findOne({
        username: 'testuser',
    });
    expect(user.openChatroom).toEqual(room._id);
});
