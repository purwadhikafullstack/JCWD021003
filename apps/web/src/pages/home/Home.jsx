import { Box } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

function Home() {
  return (
    <Box bgColor="white" maxW={'100vw'} id="home">
      <Navbar />
      <Footer />
      <Footer />
    </Box>
  );
}

export default Home;
