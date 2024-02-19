// import React, { useRef, useState } from 'react';
import { Box, Button, Image, Text } from '@chakra-ui/react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Banner from '../../../../assets/hero3.jpg';
import Banner2 from '../../../../assets/hero4.jpg';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Scrollbar } from 'swiper/modules';

export const Hero = () => {
  return (
    <Box
      display={'flex'}
      bgColor={"black"}
      alignItems={'center'}
      h={{ base: '220px', sm: '300px', md: '400px', lg: '500px' }}
      // mt={{ base: '30px', sm: '60px', lg: '69px' }}
      ml={'-1px'}
    >
      <Box
        position={'absolute'}
        zIndex={5}
        color={'white'}
        left={{ base: 10, lg: 20 }}
      >
        <Text fontSize={{ sm: '24px', lg: '48px' }} fontWeight={700}>
          New Collection
        </Text>
        <Text
          fontSize={{ base:'7px',sm: '10px', lg: '18px'}}
          fontWeight={300}
          mt={{ sm: '-7px', lg: '-15px' }}
        mb={{sm:'15px', base:'9px'}}
        >
          DISCOVERY YOUR OWN SHOES
        </Text>
       
        <Link>
          <Button
            bgColor={'green'}
            color={'white'}
            size={'sm'}
            _hover={{ color: 'green', bgColor: 'white' }}
            borderRadius={{ base: '5px' }}
            w={{ base: '55px', lg: '110px' }}
            h={{ base: '20px', lg: '40px' }}
            fontSize={{ base: '10px', lg: '16px' }}
            fontWeight={400}
            mt={{ base: '0', lg: '30px' }}
          >
            Shop Now
          </Button>
        </Link>
      </Box>
      <Swiper
        slidesPerView={1}
        initialSlide={0}
        style={{ height: '100%' }}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        scrollbar={{
          el: '.swiper-scrollbar',
          hide: true,
        }}
        modules={[Autoplay, Scrollbar]}
        className="mySwiper"
        >
        <SwiperSlide>
          <Box
            color={'white'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            h={'full'}
          >
            <Image src={Banner} h={'full'} w={'full'} objectFit={"contain"} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            color={'white'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            h={'full'}
          >
            <Image src={Banner2} h={'full'} w={'full'} objectFit={"contain"} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            color={'white'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            h={'full'}
          >
            <Image src={Banner} h={'full'} w={'full'} objectFit={"contain"} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            color={'white'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            h={'full'}
          >
            <Image src={Banner2} h={'full'} w={'full'} objectFit={"contain"} />
          </Box>
        </SwiperSlide>
        <Box className="swiper-scrollbar" background={'white'}></Box>
      </Swiper>
    </Box>
  );
};
