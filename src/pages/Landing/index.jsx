import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactLogo from '../../assets/images/300.svg';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
function Landing({ title }) {
    useEffect(() => {
        document.title = title || 'MovieCrate | Welcome';
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} align="center">
                    <img
                        src={ReactLogo}
                        loading="lazy"
                        alt=""
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={4} sx={{ px: 2 }}>
                        <Typography variant="h3" align="center" gutterBottom>
                            MovieCrate
                        </Typography>
                        <Typography variant="h5" align="center" gutterBottom>
                            Unlock the secrets of your favorite movies with our detailed displays.
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            className="  w-full"
                        >
                            <Link to="/movies">
                                <Button color="success"  >
                                    Start Explore
                                </Button>
                            </Link>
                        </Box>

                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Landing;
