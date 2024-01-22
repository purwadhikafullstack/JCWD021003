// import { useEffect, useState } from "react";
// import axios from "axios";
import { Box, SimpleGrid } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Hero } from './components/Hero Section';
import { CarouselKategori } from './components/CaroselKategori';
import { CardContainer } from './components/CardContainer';
import { ProductCard } from './components/card';
import Shoes1 from '../../assets/shoes1.png';

function Home() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Category A',
      price: 500000,
      image: 'http://pluspng.com/img-png/shoes-png-nike-shoes-transparent-background-800.png',
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Category B',
      price: 999000,
      image: 'http://pluspng.com/img-png/nike-shoe-png-nike-running-shoes-png-image-transparent-free-download-1200.png',
    },
    {
      id: 3,
      name: 'Product 3',
      category: 'Category A',
      price: 600000,
      image: 'http://clipart-library.com/images_k/shoe-transparent-background/shoe-transparent-background-22.png',
    },
    {
      id: 4,
      name: 'Product 3',
      category: 'Category A',
      price: 754000,
      image: 'http://clipart-library.com/images_k/shoe-transparent-background/shoe-transparent-background-12.png',
    },
  ];

  return (
    <Box bgColor="white" maxW={'100vw'} id="home">
      <Navbar />
      <Hero />
      <CarouselKategori />
      <SimpleGrid columns={3} spacing={4}>
        {products?.map((data) => (
          <ProductCard
            key={data.id}
            image={data.image}
            name={data.name}
            category={data.category}
            price={data.price}
            onAddToCart={() => handleAddToCart(data.id)}
          />
        ))}
      </SimpleGrid>{' '}
      <Footer />
    </Box>
  );
}

export default Home;
