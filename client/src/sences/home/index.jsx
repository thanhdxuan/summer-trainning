import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid } from "@mui/material";
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import SubjectCard from '../../components/SubjectCard';
import './styles.css'
import SearchBar from './components/SearchBar';

const Home = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [topics, setTopics] = useState([]);


   useEffect(
      () => {
         fetch('/topics')
            .then(res => res.json())
            .then(data => {
               setTopics(data)
            })
            .catch(err => console.log(err))
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
               {topics.map((_, index) => (
                  <Grid item xs={6} key={index + 10}>
                     <SubjectCard key={index} cardInfo={topics[index]} />
                  </Grid>
               ))}
            </Grid>
         </Container>
      </Box>
   );
}

export default Home;