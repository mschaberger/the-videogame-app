import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';

import App from './App.js';
import LandingPage from './Components/1.LandingPage.jsx';
import Home from './Components/2.Home.jsx';
import CreateGame from './Components/7.CreateGame.jsx';
import GameDetail from './Components/8.GameDetail';

describe( '<App/>', () => {
    let app;
    beforeEach(() => {
        app = shallow(<App/>);
        expect(app).toBeTruthy();
    });

    it('Should render <LandingPage/> in the exact path /', () => {
        expect(app.find(Route).at(0).prop('path')).toEqual('/');
        expect(app.find(Home)).toHaveLength(0);
        expect(app.find(CreateGame)).toHaveLength(0);
        expect(app.find(GameDetail)).toHaveLength(0);
    })

    it('Should render <Home/> in the exact path /home', () => {
        expect(app.find(Route).at(1).prop('path')).toEqual('/home');
        expect(app.find(LandingPage)).toHaveLength(0);
        expect(app.find(CreateGame)).toHaveLength(0);
        expect(app.find(GameDetail)).toHaveLength(0);
    })

    it('Should render <CreateGame/> in the exact path /videogame', () => {
        expect(app.find(Route).at(2).prop('path')).toEqual('/videogame');
        expect(app.find(LandingPage)).toHaveLength(0);
        expect(app.find(Home)).toHaveLength(0);
        expect(app.find(GameDetail)).toHaveLength(0);
    })

    it('Should render <GameDetail/> in the exact path /home/:id', () => {
        expect(app.find(Route).at(3).prop('path')).toEqual('/home/:id');
        expect(app.find(LandingPage)).toHaveLength(0);
        expect(app.find(Home)).toHaveLength(0);
        expect(app.find(CreateGame)).toHaveLength(0);
    })


})