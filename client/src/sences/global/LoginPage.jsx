import { useState } from 'react';
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
import { useTheme, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResetRequestDialog from '../../components/ResetRequestDialog';

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


const LoginPage = ({ setLoggedIn }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const [helperText, setHelperText] = useState("");
   const [openReset, setOpenRequest] = useState(false);

   const handleChange = (event) => {
      event.preventDefault();
      if (event.target.id === 'email') {
         setEmail(event.target.value);
      }
      else {
         setPassword(event.target.value);
      }
   };
   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      try {
         axios({
            method: 'post',
            url: 'http://localhost:5000/users/login',
            data: data
         })
            .then((res) => {
               const dataResponse = {
                  username: res.data.username,
                  email: res.data.email,
                  is_admin: res.data.is_admin,
                  is_active: res.data.is_active,
                  token: res.data.token,
                  uid: res.data.uid
               };
               return dataResponse;
            })
            .then((dataRes) => {
               if (dataRes.is_active) {
                  sessionStorage.setItem('user', JSON.stringify(dataRes));
                  setLoggedIn(true);
                  navigate('/');
               }
               else {
                  setHelperText("Your account is not activated. Please contact your moderator.")
               }
            })
            .catch((err) => {
               const mute = err;
               if (err.response.status === 403 || err.response.status === 401) {
                  setHelperText("Email or Password is incorrect!");
               }
            });
      } catch (error) {

      };
   };

   return (
      <>
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
                           SIGN IN
                        </Typography>
                     </Grid>
                     <Grid item>
                        <img
                           alt='thumbnail' //TODO - Add an alternative img
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
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        color='secondary'
                        onChange={handleChange}
                     />
                     <FormHelperText error>{helperText}</FormHelperText>
                     <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                           <FormControlLabel
                              control={<Checkbox value="remember" color="secondary" />}
                              label="Remember me"
                           />
                        </Box>
                        <Box>
                           <Link onClick={(e) => {setOpenRequest(true);}} color='secondary' underline='none'>
                              Forgot?
                           </Link>
                        </Box>
                     </Box>
                     <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, mb: 2, height: 50 }}
                        color='success'
                        size='large'
                        variant='contained'
                        disabled={(email === '' || password === '') ? true : false}
                     >
                        Sign In
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
                           New to STraining?
                        </Grid>
                        <Grid item>
                           <Link color="secondary" underline='none' href='/signup'>
                              Create an account
                           </Link>
                        </Grid>
                     </Grid>
                     <Copyright sx={{ mt: 5 }} />
                  </Box>
               </Box>
            </Grid>
         </Grid>
         <ResetRequestDialog open={openReset} setOpen={setOpenRequest}/>
      </>
   );
};

export default LoginPage;