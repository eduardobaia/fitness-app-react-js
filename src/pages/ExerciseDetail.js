import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import  {Box } from '@mui/material'


import { exercicesOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Details from '../components/Details';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';


const ExerciseDetail = () => {

  const [exerciseDetail, setExerciseDetail] = useState([]);
  const {id} = useParams();
  const [exerciseVideos, setExerciseVideos] = useState([])

  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  useEffect(() => {
    const fetchExercisesData =  async () => {
      const exerciseDbUrl ="https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =  'https://youtube-search-and-download.p.rapidapi.com';


      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exercicesOptions);

      setExerciseDetail(exerciseDetailData);

      const exercisesVideosData = await  fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
      setExerciseVideos(exercisesVideosData.contents)


      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exercicesOptions );
      setTargetMuscleExercises(targetMuscleExercisesData);

      
      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exercicesOptions);
      setEquipmentExercises(equipmentExercisesData);

    } 
  
  
    fetchExercisesData()
  }, [id])
  
  return (
    <Box  sx={{ mt: { lg: '96px', xs: '60px' } }}>
      
      <Details exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos}  name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />


    </Box>
  )
}

export default ExerciseDetail