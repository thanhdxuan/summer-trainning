import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack, Container, Grid } from "@mui/material";
import { useTheme, IconButton } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'
import "./styles.css"
import { pink } from '@mui/material/colors';
import Header from '../../components/Header';
import SubjectCard from '../../components/SubjectCard';

const Home = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   return (
      <Box>
         <Box
            sx={{
               pt: 8,
               pb: 6,
            }}
         >
            <Container maxWidth='md'>
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
               <Box
                  display="flex"
                  backgroundColor={colors.grayAccent[100]}
                  borderRadius="3px"
                  border='0.5px solid'
                  borderColor={colors.whiteAccent[700]}
                  height='50px'
               >
                  <InputBase 
                     sx={{ ml:2, flex:1 }}
                     placeholder='Search'>Search Topics</InputBase>
                  <IconButton>
                     <SearchIcon></SearchIcon>
                  </IconButton>
               </Box>
            </Container>
         </Box>
         <Box>
            <Container maxWidth="md">
               <Header />
               <Grid container spacing={{ xs: 2, md: 3}} >
                  {Array.from(Array(6)).map((_, index) => (
                     <Grid item xs={3} sm={4} md={4} key={index}>
                        <SubjectCard />
                     </Grid>
                  ))}
               </Grid>
            </Container>
         </Box>
      </Box>
   );
}

export default Home;