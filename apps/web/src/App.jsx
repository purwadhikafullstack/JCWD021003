import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import ScrollToTop from './components/ScrollToTop';
import {Auth} from './components/Auth';
import Signup from '../src/pages/Register/index2.jsx'

function App() {
  return (
    <Auth>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<Signup />} />
      </Routes>
    </ScrollToTop>
    </Auth>
  );
}

export default App;
