import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import SimilarExercises from '../components/SimilarExercises';
import ExerciseVideos from '../components/ExerciseVideos';

const ExerciseDetails = () => {
 const [exerciseDetail, setExerciseDetail] = useState({});
 const [exerciseVideos, setExerciseVideos] = useState({});
 const {id} = useParams();

useEffect(() => {
  const fetchExerciseData = async () => {
     const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
     const youtubeSearch = 'https://youtube-search-and-download.p.rapidapi.com';
     const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,exerciseOptions);
     setExerciseDetail(exerciseDetailData);
     const exerciseVideosData = await fetchData(`${youtubeSearch}/search?query=${exerciseDetailData.name}`, youtubeOptions);
     setExerciseVideos(exerciseVideosData);
  }
  fetchExerciseData();
}, [id]);

  return (
    <Box>
        <Detail exerciseDetail={exerciseDetail} />
        <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
        <SimilarExercises />
    </Box>
  )
}

export default ExerciseDetails