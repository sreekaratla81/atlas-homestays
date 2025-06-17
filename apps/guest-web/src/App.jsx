// guest-web/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuestBooking from './pages/GuestBooking';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/guest-booking" element={<GuestBooking />} />
            </Routes>
        </>
    );
}

export default App;
