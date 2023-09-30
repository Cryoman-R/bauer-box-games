import { BrowserRouter, Routes, Route } from "react-router-dom";

import DisneylandTracker from "./Park Tracker/Main Component/disneyland-tracker-component";
import HoneyPot from "./Honey Pot/Main Component/honey-pot-component";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="disneylandTracker" element={<DisneylandTracker />} />
                <Route path="honeyPot" element={<HoneyPot />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
