import { BrowserRouter, Routes, Route } from "react-router-dom";

import DisneylandTracker from "./ParkTracker/MainComponent/disneyland-tracker-component";
import MainMenu from "./MainMenu/MainComponent/main-menu-component";
import Header from "./AllApps/HeaderComponent/header-component";
import HoneyPot from "./HoneyPot/MainComponent/honey-pot-component";
import Login from "./LoginComponent/MainComponent/login-component";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />    
                <Route path="bauer.box" element={<Header/>}>
                    <Route index element={<MainMenu />} />
                    <Route path="disneylandTracker" element={<DisneylandTracker />} />
                    <Route path="honeyPot" element={<HoneyPot />} />
                </Route>           
            </Routes>
        </BrowserRouter>
    )
}

export default App;
