import { Box, chakra, Text } from '@chakra-ui/react';
import openNewTab from '@utils/openNewTab';
import testimonials from 'constants/testimonials';
import Image from 'next/image';
import { FC } from 'react';
import Slider from 'react-slick';
import defaults from 'theme/defaults';

const Testimonials: FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
    autoplay: true,
    lazyLoad: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <Box maxW="500px">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <Box key={testimonial.name} mt="50px">
            <Box gap="12px" display="flex" alignItems="center">
              <Box w="40px" h="40px">
                <Image
                  src={testimonial.avatar}
                  width={100}
                  height={100}
                  alt={testimonial.avatar}
                  style={{ borderRadius: '50%' }}
                />
              </Box>
              <Text fontSize="14px" position="relative" zIndex="99">
                <chakra.span
                  fontWeight="bold"
                  color={defaults.primary}
                  cursor="pointer"
                  onClick={(): void => openNewTab(`https://linkedin.com/in/${testimonial.url}`)}
                >
                  {testimonial.name}
                </chakra.span>
                &nbsp;<chakra.span fontSize="11px">- {testimonial.company}</chakra.span>
              </Text>
            </Box>
            <Box mt="16px">
              <Text fontSize="16px" lineHeight="28px" color="#c4cfde">
                {testimonial.testimonial}
              </Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonials;
