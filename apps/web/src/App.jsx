import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ScrollToTop from './components/ScrollToTop';
import {Auth} from './components/Auth';
import Signup from './pages/Register'
import Signin from './pages/Login';
import Verification from './pages/user-verification';
import Profile from './pages/profileUser';

function App() {
  return (
    <Auth>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/auth/email-verification" element={<Verification />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </ScrollToTop>
    </Auth>
  );
}

export default App;
