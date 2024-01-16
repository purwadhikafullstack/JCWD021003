import { Box } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Hero } from './components/Hero Section';
import { CarouselKategori } from './components/CaroselKategori';

function Home() {
  return (
    <Box bgColor="white" maxW={'100vw'} id="home">
      <Navbar />
      <Hero />
      {/* <CarouselKategori /> */}
      <Footer />
    </Box>
  );
}

export default Home;
