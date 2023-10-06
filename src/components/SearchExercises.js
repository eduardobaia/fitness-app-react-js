import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography} from '@mui/material';
import { fetchData, exercicesOptions } from '../utils/fetchData';
import HorizontalScrollBar from './HorizontalScrollBar';



const SearchExercises = ( {setExercises, bodyPart, setBodyPart}) => {


  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () =>
    {
      const bodyPartsData =  await fetchData
      ('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exercicesOptions);

       setBodyParts(['all', ...bodyPartsData]);
    }
   
    fetchExercisesData();
  }, [])
  



  const handleSearch= async () => {
    if(search){
      const exercisesData = await fetchData
    //  ('https://exercisedb.p.rapidapi.com/exercises?limit=100', exercicesOptions);
      ('https://exercisedb.p.rapidapi.com/exercises/name/'+search+'?limit=100', exercicesOptions);

      console.log("> exercises aqui , exercise data --_>"+exercisesData);
 
       const searchedExercises = exercisesData.filter(
        (item) => item.name.toLowerCase().includes(search)
        || item.target.toLowerCase().includes(search)
        || item.equipment.toLowerCase().includes(search)
        || item.bodyPart.toLowerCase().includes(search),
 
       );
      console.log("searchedExercises ->>> "+searchedExercises);
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

      setSearch('');
      setExercises(searchedExercises);

      
    }
  }

  return (
    <Stack alignItems="center" mt="37" 
    justifyContent="center" p="20"
    >
    <Typography fontWeight={700} 
    sx={{ fontSize:{ lg: '44px' , xs: '33px'}}}
    mb="50px" textAlign="center"
    >
      Awesome Exercises you  
       should know.
    </Typography>
    <Box position="relative" mt="52px">
      <TextField       
      sx={{ 
        input: {
          fontWeight: '700', 
          border: 'none', 
          borderRadius: '4px'},
        width: { lg: '800px', xs: '280px'},
        background:'#ffff', borderRadius: '30px'

      }}
      height="76px"
      value={search}onChange= { (e) => setSearch(e.target.value.toLowerCase())}
      placeholder='Search Exercises'
      type="text"
       
       />
    <Button
    className='search-btn'
    margin-left= "10px"
    sx={{ 
      backgroundColor: '#FF2625',
      color: '#fff',
      textTransform: 'none',
      width: {lg: '175px', xs: '70px'},
      fontSize: { lg: '20px', xs: '14px'},
      height: '56px',
      position: 'absolute',
      rigth: '0'

    }}
    onClick= {handleSearch}
    >
      Search
    </Button>
    </Box>
    <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
      <HorizontalScrollBar  
        data={bodyParts}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        isBodyParts={true}
       />
    </Box>
    </Stack>
  )
}

export default SearchExercises