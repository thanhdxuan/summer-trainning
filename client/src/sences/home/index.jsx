import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Chip, FormLabel, Grid, InputBase, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme, Divider, FormControl } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import SubjectCard from '../../components/SubjectCard';
import './styles.css'
import SearchBar from './components/SearchBar';
import Topbar from '../global/TopBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChangePasswordDialog from '../../components/ChangePasswordDialog';

const Home = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [topics, setTopics] = useState([]);
   const [userData, setUserData] = useState([]);
   const [fStatusValue, setFStatusValue] = useState(-1);
   const [fLevelValue, setFLevelValue] = useState(-1);
   const user = JSON.parse(sessionStorage.getItem("user"));
   const navigate = useNavigate();
   const header = {
      'headers': {
         "x-access-token": user.token
      }
   }

   const getTopicData = async () => {
      const formData = new FormData();
      formData.append('public_id', user.uid);
      return axios
         .post(`/topics`, formData, header)
         .then((res) => res.data)
         .catch((err) => {
            if (err.response.status === 401) {
               navigate('/signin');
            }
         });
   };
   const getUserData = async () => {
      return axios
         .get(`/users/${user.uid}/status`, header)
         .then((res) => res.data);
   };

   // eslint-disable-next-line
   useEffect(
      () => {
         getTopicData().then((data) => {
            setTopics(data);
         });
         getUserData().then((data) => {
            setUserData(data);
         });
      }, []
   );

   useEffect(
      () => {
         handleFilter(fStatusValue, fLevelValue)
            .then((data) => {
               setTopics(data);
               console.log(data);
            })
            .catch(err => console.log(err));
      }, [fLevelValue, fStatusValue]
   )
   const handleSearch = async (searchTerm) => {
      fetch(`/search/topics?name=${searchTerm}`)
         .then(res => res.json())
         .then(data => {
            setTopics(data)
         })
         .catch(err => console.log(err))
   };

   const handleFilter = async (status, level) => {
      const formData = new FormData();
      formData.append('level', level);
      formData.append('status', status);
      formData.append('public_id', user.uid);
      return axios
         .post(`/filter/topics`, formData, header)
         .then(res => res.data);
   };

   return (
      <>
         <Topbar />
         <Divider flexItem />
         <Box>
            <Box
               sx={{
                  pt: 8,
                  pb: 6,
               }}
            >
               <Container maxWidth='lg'>
                  <Box
                     sx={{ mr: 40, mb: 5 }}
                     justifyContent="center"
                     display="flex"
                     flexDirection="column"
                     gap={2}
                  >
                     <Typography
                        variant="h1"
                        color={colors.blackAccent[800]}
                        fontWeight='bold'
                     >
                        Right now, your competition is training.
                     </Typography>
                     <Typography
                        variant="h4"
                        color={colors.blackAccent[800]}
                        fontWeight='bold'
                     >
                        Be stronger thanh your excusé
                     </Typography>
                     <Typography
                        variant="h4"
                        color={colors.blackAccent[800]}
                        fontWeight='bold'
                     >
                        Don't settle for average
                     </Typography>
                     <Typography
                        variant="h4"
                        color={colors.blackAccent[800]}
                        fontWeight='bold'
                     >
                        Don't bunt.
                     </Typography>
                     {/* Search bar */}
                  </Box>
                  <SearchBar onSearch={handleSearch} />
                  <Box display="flex" sx={{ mt: 2 }} gap={2}>
                     <FormControl
                        color='info'
                        fullWidth
                        size="small"
                     >
                        <InputLabel>Filter by status</InputLabel>
                        <Select
                           label="Filter by status"
                           defaultValue={-1}
                           renderValue={(selected) => {
                              const value = ['Not Completed', 'Completed'];
                              return (
                                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {
                                       <Chip key={selected} label={selected === -1 ? 'All' : value[selected]} />
                                    }
                                 </Box>
                              );
                           }}
                           onChange={(event) => {
                              const value = event.target.value;
                              setFStatusValue(value);
                           }}
                        >
                           <MenuItem value={-1}>All</MenuItem>
                           <MenuItem value={1}>Completed</MenuItem>
                           <MenuItem value={0}>Not Completed</MenuItem>
                        </Select>

                     </FormControl>
                     <FormControl
                        color='info'
                        fullWidth
                        size="small"
                     >
                        <InputLabel>Filter by level</InputLabel>
                        <Select
                           label="Filter by level"
                           defaultValue={-1}
                           renderValue={(selected) => {
                              const value = ['Easy', 'Medium', 'Hard'];
                              return (
                                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {
                                       <Chip key={selected} label={selected === -1 ? 'All' : value[selected]} />
                                    }
                                 </Box>
                              );
                           }}
                           onChange={(event) => {
                              const value = event.target.value;
                              setFLevelValue(value);
                           }}
                        >
                           <MenuItem value={-1}>All</MenuItem>
                           <MenuItem value={0}>Easy</MenuItem>
                           <MenuItem value={1}>Medium</MenuItem>
                           <MenuItem value={2}>Hard</MenuItem>
                        </Select>
                     </FormControl>
                  </Box>
               </Container>
            </Box>
            <Container maxWidth="lg">
               <Header />
               <Grid container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 1, sm: 8, md: 12 }}
                  sx={{ flexGrow: 1, mb: 4 }}
                  flexGrow={1}
                  justifyContent="space-between"
               >
                  {
                     topics.length > 0 ? (topics.map((_, index) => (
                        <Grid item xs={6} key={index + 10}>
                           <SubjectCard key={index} cardInfo={topics[index]} userData={userData[topics[index]['id']]} />
                        </Grid>
                     ))) : <div></div>
                  }

               </Grid>
            </Container>
         </Box>
      </>
   );
}

export default Home;