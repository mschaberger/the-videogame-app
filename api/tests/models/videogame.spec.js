const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

xdescribe('- - - Videogame model - - -', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));

    describe('Validators', () => {
        beforeEach(() => Videogame.sync({ force: true }));

        describe('name', () => {
            it('Should throw an error if name is null', (done) => {
                Videogame.create({})
                    .then(() => done(new Error('It requires a valid name')))
                    .catch(() => done());
            });
            it('Should throw an error if name is not a string', (done) => {
                Videogame.create({})
                    .then(() => done(new Error('It requires a valid name')))
                    .catch(() => done());
            });
            it('Should work when its a valid name', () => {
                Videogame.create({ name: 'Super Mario Bros' })
                    .then(() => done())
                    .catch(() => done(new Error('It should create a new Videogame')));
            });
            it('Should throw an error if name already exists', (done) => {
                Videogame.create({ name: 'Super Mario Bros' })
                Videogame.create({ name: 'Super Mario Bros' })
                    .then(() => done(new Error('The game already exists')))
                    .catch(() => done());
            });
        });

        describe('description', () => {
            it('Should throw an error if the description is null', (done) => {
                Videogame.create({})
                    .then(() => done(new Error('It requires a valid description')))
                    .catch(() => done());        
            });
            it('Should throw an error if description is not a string', (done) => {
                Videogame.create({
                    name: 'Super Mario Bros',
                    description: 11234
                })
                    .then(() => done(new Error('The description has to be a string')))
                    .catch(() => done());
            });
            it('Should work when its a valid description', () => {
                Videogame.create({ 
                    name: 'Super Mario Bros',
                    description: 'Great game' 
                })
                .then(() => done())
                .catch(() => done(new Error('It should create a new Videogame')));
            });
        });

        describe('released', () => {
            it('Should throw an error if released is not a string', (done) => {
                Videogame.create({
                    name: 'Super Mario Bros',
                    description: 'Great game',
                    released: 12/10/2020
                })
                    .then(() => done(new Error('The release date has to be a string')))
                    .catch(() => done());
            });
            it('Should work when its a valid release date', () => {
                Videogame.create({ 
                    name: 'Super Mario Bros',
                    description: 'Great game',
                    released: '12/10/2020' 
                })
                .then(() => done())
                .catch(() => done(new Error('It should create a new Videogame')));
            });
        });

        describe('rating', () => {
            it('Should throw an error if rating is not an integer', (done) => {
                Videogame.create({
                    name: 'Super Mario Bros',
                    description: 'Great game',
                    released: '12/10/2020',
                    rating: '3,50'
                })
                    .then(() => done(new Error('Rating has to be an integer')))
                    .catch(() => done());
            });
            it('Should work when its a valid rating', () => {
                Videogame.create({ 
                    name: 'Super Mario Bros',
                    description: 'Great game',
                    released: '12/10/2020',
                    rating: 4 
                })
                .then(() => done())
                .catch(() => done(new Error('It should create a new Videogame')));
            });
        });

        describe('platforms', () => {
            it('Should throw an error if platforms is null', (done) => {
                Videogame.create({
                    name: 'Super Mario Bros',
                    description: 'Great game',
                })
                    .then(() => done(new Error('It requires platforms')))
                    .catch(() => done());        
            });
            it('Should throw an error if platforms is not an array of strings', (done) => {
                Videogame.create({
                    name: 'Super Mario Bros',
                    description: 'Great game',
                    released: '12/10/2020',
                    rating: '3,50',
                    platforms: 'x-box, playstation 5, nintendo'
                })
                    .then(() => done(new Error('Platforms has to be an array of strings')))
                    .catch(() => done());
            });
            it('Should work when its a valid the platforms are an array of strings', () => {
                Videogame.create({ 
                    name: 'Super Mario Bros',
                    description: 'Great game',
                    released: '12/10/2020',
                    rating: 4,
                    platforms: ['x-box', 'playstation 5', 'nintendo']
                })
                .then(() => done())
                .catch(() => done(new Error('It should create a new Videogame')));
            });
        });
    });
});
