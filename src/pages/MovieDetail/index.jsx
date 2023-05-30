import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemText, Avatar } from '@mui/material';
import API from '../../services/api';
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';
const MoviePage = () => {
  const movieMock = {
    "year": 1998,
    "runtime": 83,
    "genres": [
      "Adventure",
      "Animation",
      "Comedy"
    ],
    "country": "United States",
    "principals": [
      {
        "id": "nm0506977",
        "category": "producer",
        "name": "Bradford Lewis",
        "characters": []
      },
      {
        "id": "nm0000095",
        "category": "actor",
        "name": "Woody Allen",
        "characters": [
          "Z"
        ]
      }
    ],
    "ratings": [
      {
        "source": "Internet Movie Database",
        "value": 6.5
      },
      {
        "source": "Rotten Tomatoes",
        "value": 92
      },
      {
        "source": "Metacritic",
        "value": 72
      }
    ],
    "boxoffice": 90757863,
    "poster": "https://m.media-amazon.com/images/M/MV5BMzMzMDdlMDktODg4OC00Y2E5LTk1ZjMtNzM2MzIxZGQ0ZGI3XkEyXFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    "plot": "A rather neurotic ant tries to break from his totalitarian society while trying to win the affection of the princess he loves."
  }

  const [movie, setMovie] = useState(movieMock);
  const { id } = useParams();
  // fetch('https://api.themoviedb.org/3/movie/550?api_key=1f54bd990f1cdfb230adb312546d765d')
  useEffect(() => {

    API.data({ imdbID: id }).then((response) => {

      setMovie(response);

    });

  }, []);


  return (
<Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
    <Grid item>
      <Avatar alt='' variant="square" src={movie.poster} sx={{ width: 200, height: 300 }} />
    </Grid>
    <Grid item xs={12} sm container>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4" gutterBottom>

          </Typography>
          <Typography variant="body1" gutterBottom>
            {movie.plot}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genres: {movie.genres.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Country: {movie.country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Runtime: {movie.runtime} minutes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Box Office: ${movie.boxoffice?.toLocaleString()}
          </Typography>
        </Grid>

      </Grid>
    </Grid>

    <Grid item>
      <Typography variant="h6" gutterBottom>
        Ratings
      </Typography>
      <List>
        {movie.ratings.map((rating) => (
          <ListItem key={rating.source}>
            <ListItemText primary={rating.source} secondary={rating.value} />
          </ListItem>
        ))}
      </List>
    </Grid>
    <Grid item md={12} xs={12} >
      <Typography variant="h6" gutterBottom>
        Cast
      </Typography>
      <PrincipalsGrid principals={movie.principals} />
    </Grid>
  </Grid>
</Box>
  );
};
const PrincipalsGrid = ({ principals }) => {
  const columnDefs = [

    { headerName: 'Category', field: 'category' },
    {
      headerName: 'Name', field: 'name', cellRenderer: (params) => {
        const id = params.data?.id;
        return id ? <Link to={`/people/${id}`}>
          <p className='text-blue-800'>
            {params.value}
          </p>

        </Link> : params.value;
      }
    },
    { headerName: 'Characters', field: 'characters', cellRenderer: (params) => params.value.join(', ') },
  ];

  const rowData = principals;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '80%' }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};
export default MoviePage;

// {
//   "year": 1998,
//   "runtime": 83,
//   "genres": [
//   "Adventure",
//   "Animation",
//   "Comedy"
//   ],
//   "country": "United States",
//   "principals": [
//   {
//   "id": "nm0506977",
//   "category": "producer",
//   "name": "Bradford Lewis",
//   "characters": []
//   },
//   {
//   "id": "nm0000095",
//   "category": "actor",
//   "name": "Woody Allen",
//   "characters": [
//   "Z"
//   ]
//   },
//   …
//   ],
//   "ratings": [
//   {
//   "source": "Internet Movie Database",
//   "value": 6.5
//   },
//   {
//   "source": "Rotten Tomatoes",
//   "value": 92
//   },
//   {
//   "source": "Metacritic",
//   "value": 72
//   }
//   ],
//   "boxoffice": 90757863,
//   "poster": "https://m.mediaamazon.com/images/M/MV5BMzMzMDdlMDktODg4OC00Y2E5LTk1ZjMtNzM2MzIxZGQ0ZGI3XkEyXk
//  FqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//   "plot": "A rather neurotic ant tries to break from his totalitarian society
//  while trying to win the affection of the princess he loves."
//  } 
