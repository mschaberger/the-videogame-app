/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
    id: '560a8451-a29c-41d4-a716-544676554400',
    name: 'Hello my name is New Game',
    description: 'Great game',
    released: '12/10/2020',
    rating: 4,
    genres: ["Action", "Adventure"],
    platforms: ['x-box', 'playstation 5', 'nintendo']
};

describe('- - - /videogame routes - - -', () => {
    before(() => conn.authenticate()
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    }));
    beforeEach(() => Videogame.sync({ force: true }));

    describe('GET /videogame/:id', () => {
        it('Should get the detail of a videogame by its id', async () =>
            await agent.get('/videogame/3498')
            .expect(200)
            .expect('Content-type', /json/)
        );  
    });

    describe('POST /videogame', () => {
        it('Should add a new videogame', () =>
            agent.post('/videogame')
            .send(videogame)
            .then(() => {
                expect(201)
                expect('Content-type', /json/)
            })
        );
    });
});
