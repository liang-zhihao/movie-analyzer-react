import React from 'react'
import Button from '@mui/joy/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import {observer} from 'mobx-react-lite';
import AppBar from '@mui/material/AppBar';
import {useStore} from '../../stores';
import {useNavigate} from 'react-router-dom';
import APIFunction from '../../services/api';

const NavBar = () => {
    const navigate = useNavigate();
    const store = useStore()

    const handleLogout = () => {
        store.userStore.logout()

        APIFunction.logout({refreshToken: this.refreshToken})
            .then((res) => {
                alert('logout')
                console.log('logout');
                navigate('/login')
            }).error(() => {
            alert('logout2')
            console.log('logout');
            navigate('/login')
        })
    }
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
        >
            <Toolbar sx={{flexWrap: 'wrap'}}>

                <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                    <Link href='/' underline='none' level="h5" variant="plain">MovieCrate</Link>
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="/"
                        sx={{my: 1, mx: 1.5}}
                    >
                        Home
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="/movies"
                        sx={{my: 1, mx: 1.5}}
                    >
                        Movies
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="/register"
                        sx={{my: 1, mx: 1.5}}
                    >
                        Register
                    </Link>


                </nav>
                {store.userStore.isLoggedIn ?
                    (
                        <>
                            <p>
                                {store.userStore.email}
                            </p>
                            <Button component="a" variant="outlined" sx={{my: 1, mx: 1.5}}
                                    onClick={handleLogout}
                            >
                                Logout
                            </Button>  </>
                    ) :
                    (<Button component="a" href="/login" variant="outlined" sx={{my: 1, mx: 1.5}}>
                        Login
                    </Button>)

                }

            </Toolbar>
        </AppBar>
    )
}

export default observer(NavBar)