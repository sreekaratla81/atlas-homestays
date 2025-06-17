// guest-web/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages1/Home';
import BookNow from './pages1/BookNow';
import GuestBooking from './pages1/GuestBooking'; // 👈 Add this

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book" element={<BookNow />} />
                <Route path="/guest-booking" element={<GuestBooking />} /> {/* 👈 New route */}
            </Routes>
        </>
    );
}

export default App;
