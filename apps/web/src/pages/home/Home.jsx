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
 
  // const handleAddToCart =() => {
  // }
  return (
    <Box bgColor="white" maxW={'100vw'} id="home">
      <Navbar />
      <Hero />
      <CarouselKategori />
      {/* <SimpleGrid columns={{md:3, sm:2,base:1}} spacing={4} mx={"15px"}>
        {Products?.map((data) => (
          <ProductCard
            key={data.id}
            id={data.id}
            image={data.image}
            name={data.name}
            category={data.category}
            price={data.price}
            onAddToCart={() => handleAddToCart(data.id)}
          />
        ))}
      </SimpleGrid> */}
      <CardContainer/>
      <Footer />
    </Box>
  );
}

export default Home;
