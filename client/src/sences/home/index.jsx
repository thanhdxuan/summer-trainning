import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid } from "@mui/material";
import { useTheme, Divider } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import SubjectCard from '../../components/SubjectCard';
import './styles.css'
import SearchBar from './components/SearchBar';
import Topbar from '../global/TopBar';
import axios from 'axios';

const Home = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [topics, setTopics] = useState([]);
   const [userData, setUserData] = useState([]);
   const user = JSON.parse(sessionStorage.getItem("user"));
   const header = {
      'headers': {
         "x-access-token": user.token
      }
   }
   const getTopicData = async () => {
      return axios
         .get(`/topics`, header)
         .then((res) => res.data);
   };
   const getUserData = async () => {
      return axios
         .get(`/users/${user.uid}/status`, header)
         .then((res) => res.data);
   };

   // eslint-disable-next-line
   useEffect(
      () => {
         getTopicData().then((data) => setTopics(data));
         getUserData().then((data) => setUserData(data));
      }, []
   );

   const handleSearch = (searchTerm) => {
      fetch(`/search/topics?name=${searchTerm}`)
         .then(res => res.json())
         .then(data => {
            setTopics(data)
         })
         .catch(err => console.log(err))
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
                        Find textbook solutions you can trust
                     </Typography>
                     <Typography
                        variant="h4"
                        color={colors.blackAccent[800]}
                        fontWeight='bold'
                     >
                        Step-by-step explanations
                     </Typography>
                     <Typography
                        variant="h4"
                        color={colors.blackAccent[800]}
                        fontWeight='bold'
                     >
                        Expert-written and verified answers
                     </Typography>
                     <Typography
                        variant="h4"
                        color={colors.blackAccent[800]}
                        fontWeight='bold'
                     >
                        Millions of solutions for popular textbooks
                     </Typography>
                     {/* Search bar */}
                  </Box>
                  <SearchBar onSearch={handleSearch} />
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