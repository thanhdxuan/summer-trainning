import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
   return (
      <Typography variant="h5" color="text.secondary" align="center" {...props}>
         {'Copyright © '}
         <Link color="inherit" href="http://localhost:3000">
            STraining
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}


const SignUpPage = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [username, setUserName] = useState("");
   const navigate = useNavigate();


   const handleChange = (event) => {
      event.preventDefault();
      if (event.target.id == 'email') {
         setEmail(event.target.value);
      }
      else if (event.target.id == 'password') {
         setPassword(event.target.value);
      }
      else {
         setUserName(event.target.value);
      }
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      axios({
         method: 'post',
         url: 'http://localhost:5000/users/signup',
         data: data
      })
         .then((res) => {
            if (res.status === 201) {
               console.log("Successfully!");
            }
            else {
               console.log("Failed!");
            }
         })
         .then(() => {
            navigate('/');
         })
         .catch((res) => {
            console.log(res);
         });
   };

   return (
      <Grid container sx={{ height: '100vh' }}>
         <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
               backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
               backgroundRepeat: 'no-repeat',
               backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
               backgroundSize: 'cover',
               backgroundPosition: 'center',
            }}
         />
         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
               sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <Grid item>
                     <Typography
                        variant="h2"
                        sx={{
                           fontWeight: 800
                        }}
                     >
                        SIGN UP
                     </Typography>
                  </Grid>
                  <Grid item>
                     <img
                        src='/images/logo/light-removebg.png'
                        style={{
                           height: 50
                        }}
                     />
                  </Grid>
               </Grid>
               <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} width='100%' maxWidth='md'>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                     color='secondary'
                     onChange={handleChange}
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="username"
                     label="Your Username"
                     name="username"
                     autoComplete="username"
                     autoFocus
                     color='secondary'
                     onChange={handleChange}
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     color='secondary'
                     onChange={handleChange}
                  />
                  <Button
                     type="submit"
                     fullWidth
                     sx={{ mt: 3, mb: 2, height: 50 }}
                     color='success'
                     size='large'
                     variant='contained'
                     disabled={(username == '' || password == '' || email == '') ? true : false}
                  >
                     Sign Up
                  </Button>
                  <Grid
                     container
                     sx={{
                        border: 2,
                        borderColor: colors.whiteAccent[600],
                        height: 40
                     }}
                     alignItems="center"
                     justifyContent="center"
                     gap={0.5}
                  >
                     <Grid item>
                        You have an account?
                     </Grid>
                     <Grid item>
                        <Link color="secondary" underline='none' href='/signin'>
                           Login now!
                        </Link>
                     </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
               </Box>
            </Box>
         </Grid>
      </Grid>
   );
};

export default SignUpPage;