import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack, Container } from "@mui/material";
import { useTheme, IconButton } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'
import "./styles.css"
const Home = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   return (
      <Box
         sx={{
            pt: 8,
            pb: 6,
         }}
      >
         <Container maxWidth='md'>
            <Box
               sx={{ mr: 40, mb: 10 }}
               spacing={2}
               justifyContent="center"
            >
               <Typography
                  variant="h1"
                  color={colors.blackAccent[800]}
                  fontWeight='bold'
                  >
                  Find textbook solutions you can trust
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
   );
}

export default Home;