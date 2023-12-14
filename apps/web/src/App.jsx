import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/Login';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box overflow={"hidden"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
