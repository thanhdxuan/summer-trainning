import { Typography, Box, Container, useTheme, MobileStepper } from '@mui/material';
import { tokens } from '../../theme';
import { useState, useEffect } from 'react';
import Post from './components/post';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';


const PostsPage = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { topicId } = useParams();

   const [activeStep, setActiveStep] = useState(0);
   const [posts_data, setPostData] = useState([]);
   const [maxSteps, setMaxSteps] = useState(0);

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };
   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   useEffect(
      () => {
         fetch(`/topics/${topicId}/posts`)
         .then(res => res.json())
         .then(data => {
            setMaxSteps(data.length);
            setPostData(data);
         })
         .catch(err => console.log(err))
      }, []
   );

   return posts_data.length > 0 ? (
      <Container maxWidth='lg'>
         {/* Header */}
         <Box sx={{ mb: 2 }}>
            <Typography variant='h6' fontWeight="bold" >
               {posts_data['title']}
            </Typography>
         </Box>
         <Box sx={{ mt: 4, mb: 2 }} fontWeight="bold" fontSize={{ sx: 12, md: 18 }}>
            Posts
         </Box>
         <Post postInfor={posts_data[activeStep]} />
         <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
               mt: 2,
               bgcolor: colors.whiteAccent[100],
               borderRadius: 2
            }}
            nextButton={
               <Button
                  onClick={handleNext}
                  color="secondary"
                  disabled={activeStep === maxSteps - 1}
               >
                  Next
                  <KeyboardArrowRight />
               </Button>
            }
            backButton={
               <Button color="secondary" onClick={handleBack} disabled={activeStep === 0}>
                  <KeyboardArrowLeft/>
                  Back
               </Button>
            }
         />
      </Container>
   ) : "This topic hasn't posts yet!";
}

export default PostsPage;