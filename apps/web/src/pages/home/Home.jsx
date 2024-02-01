// import { useEffect, useState } from "react";
// import axios from "axios";
import { Box, SimpleGrid } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Hero } from './components/Hero Section';
import { CarouselKategori } from './components/CaroselKategori';
// import { CardContainer } from './components/CardContainer';
import { ProductCard } from './components/card';
import Shoes1 from '../../assets/shoes1.png';
import { Products } from '../../../dummy/product';
import { CardContainer } from './components/CardContainer';

function Home() {

  return (
    <Box bgColor="white" maxW={'100vw'} id="home">
      <Navbar />
      <Hero />
      <CarouselKategori />
      <CardContainer/>
      <Footer />
    </Box>
  );
}

export default Home;
