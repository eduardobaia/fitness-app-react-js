import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import  {Box, Stack, Typography, Button} from '@mui/material';

import { exercicesOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({exercises, setExercises, bodyPart }) => {

  const [currentPage, setCurrentPage] = useState(1)
  
  
  const exercisesPerPage = 4;

  const indextOfLastExercise = currentPage * exercisesPerPage;
  const indextOfFirstExercise = indextOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indextOfFirstExercise, indextOfLastExercise);

  useEffect(() => {
    const fetchExercisesData = async () => {
        let exercisesData = [];

      if(bodyPart === 'all'){
        exercisesData = await fetchData
        ('https://exercisedb.p.rapidapi.com/exercises?limit=100', exercicesOptions);
  
      } else {
        exercisesData =  await fetchData
        (`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=200`, exercicesOptions);
  
      }

  
    setExercises(exercisesData);
    }

    fetchExercisesData();
  }, [bodyPart])

  const paginate = (e, value) =>{
      setCurrentPage(value);
      window.scrollTo({ top: 1800, behavior: 'smooth'})

  }



  



  return (
    <Box id="exercises"
    sx={{ mt:{ lg: '110px'}}}
    mt="50px"
    p="20px"
    >

    <Typography variant='h3' mb="46px">Showing results</Typography>
    <Stack 
    direction="row" 
    sx={{ gap: {lg:'110px', xs:'50px'}}}
    flexWrap="wrap"
    justifyContent="center"
    >
      {currentExercises.map((exercise, index) => (
        <ExerciseCard key={index} exercise={exercise} />
      ))}
    </Stack>
    <Stack mt="100px" alignItems="center">
      {exercises.length > exercisesPerPage &&(
        <Pagination
          color="standard"
          shape="rounded"
          default={1}
          count={Math.ceil(exercises.length /exercisesPerPage)}
          page={currentPage}
          // onChange={(e) => paginate(e,value)} same as 
          onChange={paginate}
          size="large"
         />
      )}
      </Stack>   
    </Box>
  )
}

export default Exercises