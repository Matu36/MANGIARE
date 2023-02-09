import React from "react";
import s from "./RecipeCard.module.scss";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Box} from '@chakra-ui/react'


function RecipeCard({ id, image, title, diets }) {
  return (
    <NavLink to={`/recipes/${id}`}>
      <Card maxW='sm' _hover={{ transform: 'scale(1.05)' }} transition='all 0.3s ease-out'>
        <CardBody>
          <Box position='relative'>
            <Image
              src={image}
              alt='Imagen de la receta'
              borderRadius='lg'
              height='full'
              width='full'
            />
            <Stack
              mt='6'
              spacing='3'
              position='absolute'
              zIndex='1'
              top='0'
              left='0'
              right='0'
              bottom='0'
              p='6'
            >
              <Heading size='md' textAlign='center' fontSize='4xl' color='white'>{title}</Heading>         
          
            </Stack>
          </Box>
        </CardBody>
        <Divider />
        <Box display='flex' flexDirection='row' textAlign='center'>
    {diets.map((d, i) => {
      d = d[0].toUpperCase() + d.slice(1);
      return (
        <Box key={i} p='2' bg='green.500' color='white' textAlign='center' m='2' rounded='lg'>
          <Text fontSize='xs' color = 'white' textAlign='center'>{d}</Text>
        </Box>
      );
    })};
  </Box>
        <CardFooter style={{ display: 'flex', justifyContent: 'center' }}>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' fontSize='xl' >
              Get the recipe!
            </Button>
            
          </ButtonGroup>
        </CardFooter>
      </Card>
    </NavLink>
  );
}


      // <div className={s.card} id={id}>
      //   <img className={s.img} src={image} alt={title} />

      //   <div className={s.titleDiv}>
      //     <h2>{title}</h2>
      //   </div>

      //   <div className={s.bottomDiv}>
      //     <div className={s.dietsDiv}>
      //       {diets.map((d, i) => {
      //         d = d[0].toUpperCase() + d.slice(1);
      //         return <p key={i}>{d}</p>;
      //       })}
      //     </div>

      //     <div className={s.buttonDiv}>
      //       <button>DETAILS</button>
      //     </div>
      //   </div>
      // </div>

export default RecipeCard;
