// const request = require('supertest');
// const mongoose = require('mongoose');
// let server;
// const { Genre } = require('../../model/genres')
// const { User } = require('../../model/user')

// describe('/api/genres', () => {
//     beforeEach(async () => {
//         server = require('../../index'); // Start the server before each test
//         process.env.NODE_ENV = 'test';
//     });
//     afterEach(async () => {
//         await server.close(); // Close the server after each test
//         await Genre.deleteMany({})
//     });



//     describe('GET /', () => {
//         it('should return all genres', async () => {
//             let genre1 = 'genre1';
//             let genre2 = 'genre2';
//             await Genre.collection.insertMany([
//                 { name: genre1 },
//                 { name: genre2 }
//             ])
//             const res = await request(server).get('/api/genres');
//             expect(res.status).toBe(200);
//             expect(res.body.length).toBe(2)
//             expect(res.body.some(g => g.name === genre1)).toBeTruthy()
//             expect(res.body.some(g => g.name === genre2)).toBeTruthy()
//         });
//     });

//     describe('GET /:', () => {
//         it("Should return a genre if valid id is passed", async () => {
//             const genre = new Genre({ name: 'genre1' })
//             await genre.save()

//             const res = await request(server).get('/api/genres/' + genre._id)

//             expect(res.status).toBe(200)
//             expect(res.body).toHaveProperty('name', genre.name)
//         })
//         it("Should return 404 invalid id ", async () => {

//             const res = await request(server).get('/api/genres/1')

//             expect(res.status).toBe(404)
//         })
//     })

//     describe('POST / ', () => {
//         let token;
//         let name;

//         const exec = async () => {
//             return await request(server)
//                 .post('/api/genres')
//                 .set('x-auth-token', token)
//                 .send({ name })
//         }

//         beforeEach(() => {
//             token = User().generateAuthToken()
//             name = "genre1"

//         })
//         it('SHould return 401 it not login', async () => {
//             token = ''
//             const res = await exec()
//             expect(res.status).toBe(401)
//         })
//         it('SHould return 400 genre is less than 5 character ', async () => {

//             name = 1234
//             const res = await exec()
//             expect(res.status).toBe(400)
//         })
//         it('SHould return 400 genre is greterthan than 50 character ', async () => {
//             name = new Array(52).join('a')
//             const res = await exec()
//             expect(res.status).toBe(400)
//         })


//         it('SHould save the genere if it is valid ', async () => {
            
//             const genre = await Genre.find({ name: 'genre1' })
//             expect(genre).not.toBeNull()
//         })


//         it('should return the genre if it is valid', async () => {
//             const res = await exec()

//             expect(res.body).toHaveProperty('_id');
//             expect(res.body).toHaveProperty('name', 'genre1');
//         });
//     })
// });
