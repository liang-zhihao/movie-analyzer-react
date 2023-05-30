import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/joy/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MyToastContainer from '../../components/MyToasterContainer';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import IMG from '../../assets/images/download.svg';
import { useEffect } from 'react';
function Login({ title }) {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = title || 'MovieCrate | Welcome';
  }, []);
  const store = useStore()
  const onSubmit = (data) => {
    setLoading(true)

    store.userStore.login(data)
      .then((res) => {
        console.log(res);
        toast.success('Login Success');
        setLoading(false)
        navigate('/');
        window.location.reload();

      }).catch((err) => {
        console.log(err);
        toast.error('Email or password is incorrect');
        setLoading(false)
      })
  }
  return (
    <Grid container component="main" className='mt-10' sx={{ height: '100vh' }}>
      <CssBaseline />

      <Grid
        item
        xs={false}
        sm={4}
        md={7}


      >
        <img src={IMG} alt="" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={3} >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
            <LockOutlinedIcon />
          </Avatar>

          <Typography className="" component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth

              label="Password"
              type="password"

              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}

            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <MyToastContainer />
    </Grid>
  );
}
export default observer(Login)