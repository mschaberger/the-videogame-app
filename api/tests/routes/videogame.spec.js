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
    beforeEach(() => Videogame.sync({ force: true })
        .then(() => Videogame.create(videogame)));

    describe('GET /videogame/:id', () => {
        it('Should get the detail of a videogame by its id', () =>
            agent.get('/videogame/3498')
            .expect(200)
            .expect('Content-type', /json/)
        );
        it('Should return an Error if the id is not found', () =>
            agent.get('videogame/9999999999999999999')
            .expect(404)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.deep.eql({ message: 'Game not found'})
            })
        );    
    });

    describe('POST /videogame', () => {
        it('Should add a new videogame', () =>
            agent.post('/videogame')
            .send(videogame)
            .expect(201)
            .expect('Content-type', /json/)
        );
        it('Should return an Error if the game is not created',() =>
            agent.post('/videogame')
            .send()
            .expect(400)
        );
    });
});
