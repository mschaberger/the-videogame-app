import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/1.LandingPage.jsx';
import Home from './Components/2.Home.jsx';
import CreateGame from './Components/7.CreateGame.jsx';
import GameDetail from './Components/8.GameDetail';

//ACA VAN TODAS MIS RUTAS DEL FRONT

function App() {
    return (
        <BrowserRouter> 
            <div className="App">
                <Routes>
                    <Route exact path="/" element = {<LandingPage />} />
                    <Route exact path="/home" element = {<Home />} />
                    <Route exact path="/videogame" element = {<CreateGame />} />
                    <Route exact path="/home/:id" element = {<GameDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
