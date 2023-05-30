import React, { useEffect, useState } from 'react';
import { Typography, Collapse } from '@mui/material';
import APIFunction from '../../services/api';
import { Button } from '@mui/joy';
import { Bar } from 'react-chartjs-2';
import { Link, useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { set } from 'react-hook-form';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ActorDetail = () => {

 
  const [actor, setActor] = useState({
    name: '',
    birthYear: '',
    deathYear: '',
    roles: [],

  });
  const { id } = useParams();
  useEffect(() => {
    APIFunction.get({ id }).then((response) => {
      console.log(response);
      const t = response
      t.roles.sort((a, b) => b.imdbRating - a.imdbRating);
      setActor(t);
      // Sort the roles by rating
       
    });
  }, [id])
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="flex flex-col items-center mt-8">
      <Typography variant="h4" className="font-bold mb-4">
        {actor.name}
      </Typography>
      <Typography variant="subtitle1" className="mb-4">
        {actor.birthYear} - {actor.deathYear || 'present'}
      </Typography>

      <div className="w-full">
        <ul className='mb-8' >
          {actor.roles.slice(0, showAll ? actor.roles.length : 10).map(({ movieName, movieId, characters, imdbRating }) => (
            <li
              key={movieId}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <div>
                <Link to={`/movies/${movieId}`} >
                  <Typography variant="subtitle1" className="font-bold text-blue-800">
                    {movieName}
                  </Typography>
                </Link>
                <Typography variant="subtitle2" className="mt-1">
                  {characters.join(', ')}
                </Typography>
              </div>
              <Typography variant="subtitle2" className="text-gray-600">
                {imdbRating}
              </Typography>
            </li>
          ))}
        </ul>

        <Button
          className='mt-5'
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </Button>
        <ActorMoviesChart actor={actor} />
      </div>
    </div>
  );
};
const ActorMoviesChart = ({ actor }) => {

  // Sort the roles by rating
  const getRatingsData = (roles) => {
    const ratings = roles.map((role) => role.imdbRating);
    const counts = new Array(11).fill(0);
    for (let i = 0; i < ratings.length; i++) {
      const rating = Math.floor(ratings[i]);
      counts[rating] += 1;
    }
    const labels = counts.map((count, index) => index);
    const data = counts;
    return { labels, data };
  };


  const { labels, data } = getRatingsData(actor.roles);
  console.log(labels, data);
  const dataSet = {
    labels: labels,
    datasets: [
      {
        label: 'Movie Ratings',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y:
      {
        ticks: {
          beginAtZero: true
        }
      },
      x: {
        beginAtZero: true
      }

    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${actor.name} Movie Ratings Distribution`,
      },

    },
  };
  return (
    <div>
      <h2></h2>
      <Bar data={dataSet} options={options} />
    </div>
  );
};
export default ActorDetail;