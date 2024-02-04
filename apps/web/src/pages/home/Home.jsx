// import { useEffect, useState } from "react";
// import axios from "axios";
import { Box, SimpleGrid,Button } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Hero } from './components/Hero Section';
import { CarouselKategori } from './components/CaroselKategori';
// import { CardContainer } from './components/CardContainer';
import { ProductCard } from './components/card';
import Shoes1 from '../../assets/shoes1.png';
import { Products } from '../../../dummy/product';
import { CardContainer } from './components/CardContainer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box bgColor="white" maxW={'100vw'} id="home">
      <Navbar />
      <Hero />
      <Link to={'/admin-dashboard/account-management'}>
      <Button> account management </Button>
      </Link>
      <CarouselKategori />
      <CardContainer/>
      <Footer />
    </Box>
  );
}

export default Home;
