import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  useColorMode,
  Flex,
  HStack,
  Button,
  ButtonGroup,
  Image,
  Stack,
  Grid,
} from "@chakra-ui/react";
import background from "../../img/LandingPageBackground.png";
import { Link } from "react-router-dom";
import mangiare from "../../img/LandingTitle.png";

const LandingPage = ({ title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSecondVisible, setIsSecondVisible] = useState(false);
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsSecondVisible(true);
    }, 1000);
  }, []);

  return (
    <Box
      width="100%"
      height="100vh"
      backgroundImage={background}
      align={"center"}
      style={{
        backgroundSize: "cover",
        filter: "contrast(100%)",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <Flex
        height="100%"
        width="70%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          // flex='1'
          as="header"
          mt={{ base: "40", md: "40" }}
          alignContent={"center"}
          transition="all 4s"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-4rem)",
          }}
        >
          <Image
            src={mangiare}
            alt="Mangiare"
            maxW={{ base: "100%", md: "70%" }}
            maxH={{ base: "30vh", md: "unset" }}
            align="center"
          />
        </Box>

        <Box
          // flex='1'
          mt={{ base: "2", md: "5" }}
          transition="all 4s"
          alignContent={"center"}
          style={{
            opacity: isSecondVisible ? 1 : 0,
            transform: isSecondVisible ? "translateY(0)" : "translateY(-4rem)",
          }}
        >
          <Text
            fontSize={{ base: "xl", md: "4xl" }}
            fontWeight="bold"
            textAlign="center"
          >
            Your all-in-one solution for everyday cooking.
          </Text>
        </Box>

        <Box
          flex="1"
          mt={{ base: "6", md: "10" }}
          spacing={1}
          width={{ base: "100%", md: "50%" }}
          alignContent={"center"}
        >
          <Link to="/home">
            <Button
              colorScheme="teal"
              variant="solid"
              size="lg"
              width="60%"
              align="center"
            >
              Let's get cooking!
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default LandingPage;

// import React, { useState, useEffect } from 'react'
// import { Box, Text, useColorMode, Flex, HStack, Button, ButtonGroup, Image } from '@chakra-ui/react'
// import background from '../../img/LandingPageBackground.png'
// import { Link } from 'react-router-dom'
// import mangiare from '../../img/LandingTitle.png'

// const LandingPage = ({ title }) => {
//   const [isVisible, setIsVisible] = useState(false)
//   const [isSecondVisible, setIsSecondVisible] = useState(false)
//   const { colorMode } = useColorMode()
//   const bgColor = { light: 'gray.100', dark: 'gray.700' }

//   useEffect(() => {
//     setTimeout(() => {
//       setIsVisible(true)
//     }, 500)
//   }, [])

//   useEffect(() => {
//     setTimeout(() => {
//       setIsSecondVisible(true)
//     }, 1000)
//   }, [])

//   return (

//     <Box
//     width="100%"
//     height="100vh"
//     marginTop="1px"
//     backgroundImage={background}
//     style={{
//       backgroundSize: "cover",
//       filter: "contrast(100%)",
//       backgroundPosition: "center center",
//       backgroundAttachment: "fixed",
//     }}>
//       <HStack spacing='24px'>
//       <Box width='100%' display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column">
//     <Box
//       flex='1'
//       as="header"
//       // p={1}
//       mt='40px'
//       alignContent={'center'}
//       // bg={bgColor[colorMode]}
//       rounded="lg"
//       transition="all 4s"
//       style={{
//         opacity: isVisible ? 1 : 0,
//         transform: isVisible ? 'translateY(0)' : 'translateY(-4rem)'
//       }}
//     >
//       <Image src={mangiare} alt="Mangiare" width="800px" height="350px"
//     />

//     </Box>

//     <Box
//       flex='1'
//       mt='10px'
//       // bg={bgColor[colorMode]}
//       rounded="lg"
//       transition="all 4s"
//       alignContent={'center'}
//       style={{
//         opacity: isSecondVisible ? 1 : 0,
//         transform: isSecondVisible ? 'translateY(0)' : 'translateY(-4rem)'
//       }}
//     >
//       <Text fontSize="40px" fontWeight="bold">
//         Your all-in-one solution for everyday cooking.
//       </Text>
//     </Box>
//     <Box flex='1'>
//     <Link to="/home">
//     <ButtonGroup spacing="6" marginTop="20px" marginLeft="20px">
//       <Button colorScheme="teal" variant="solid" size="lg">
//         Let's get cooking!
//       </Button>
//     </ButtonGroup>
//     </Link>
//     </Box>
//     </Box>
//     </HStack>
//     </Box>
//   )
// }

// export default LandingPage

// import React from "react";
// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
// import style from "../LandingPage/LandingPage.module.css";
// import LoginForm from "../../components/LoginForm/LoginForm";
// //import { useState } from "react";
// //import { validate } from "../../utils/validations";

// export default function LandingPage() {
//   //const [errors, setErrors] = useState({});

//   const divStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundSize: "cover",
//     height: "250px",
//   };

//   const slideImages = [
//     {
//       url: "https://www.lasaltena.com.ar/wp-content/uploads/2020/02/recetaSlider2-1349x675.jpg.webp",
//       caption: "Slide 1",
//     },
//     {
//       url: "https://www.annarecetasfaciles.com/files/pollo-asado-cava-1536x862.jpg",
//       caption: "Slide 2",
//     },
//     {
//       url: "https://www.paulinacocina.net/wp-content/uploads/2014/08/P1100479.jpg",
//       caption: "Slide 3",
//     },
//   ];

//   //setErrors (
//   //validate ({
//   //Usuario: input.Usuario,
//   //Contraseña: input.Contraseña,
//   //})

//   //)

//   return (
//     <div className={style.container}>
//       <div className={style.divTitle}>
//         <h1 className={style.tittle}>MANGIAR-E</h1>
//       </div>
//       <div className={style.containerslydeYregistro}>
//         <div className={style.iniciosesionmasbotones}>
//           <LoginForm />
//         </div>
//         <div className={style.slide}>
//           <Slide>
//             {slideImages.map((slideImage, index) => (
//               <div key={index}>
//                 <div className= {style.image}
//                   style={{
//                     ...divStyle,
//                     backgroundImage: `url(${slideImage.url})`,
//                   }}
//                 ></div>
//               </div>
//             ))}
//           </Slide>
//         </div>
//       </div>
//       <div className={style.colaborators}>

//       </div>
//     </div>
//   );
// }
