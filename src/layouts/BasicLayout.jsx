import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Container from '@mui/joy/Container';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import NavBar from '../components/Navbar';
// All data is from IMDB, Metacritic and RottenTomatoes.
// © 2023 Firstname Lastname
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'All data is from IMDB, Metacritic and RottenTomatoes. Copyright © '}

            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function BasicLayout(props) {
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            <NavBar />
            {/* maxWidth="md" */}
            {/* End hero unit */}
            <Container component="main" className='mt-10' >
                {props.children}
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >

                <Copyright sx={{ mt: 5 }} />
            </Container>

            {/* End footer */}
        </React.Fragment>
    );
}

export default BasicLayout