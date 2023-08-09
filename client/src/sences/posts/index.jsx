import { Stack, Typography, Box, Container, useTheme, MobileStepper } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import { useState } from 'react';
import Post from './components/post';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';

const posts_data = [
   {
      id: 1,
      title: "Display Images In React",
      banner: "images/image.svg",
      description: "There are several ways to import and use images in React. Sometimes, it seems not to work, and we will see why.",
      key_word: ['post_1', 'post_2'],
      content: "There are many variations of passages of Lorem Ipsum available, u \
         but the majority have suffered alteration in some form, by injected humour, or\
         randomised words which don't look even slightly believable. If you are going to\
         use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing\
         hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to\
         repeat predefined chunks as necessary, making this the first true generator on the Internet.\
         It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures,\
         to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free, \
         from repetition, injected humour, or non-characteristic words etc",
      estimate_time: "5 mins",
      author: "admin",
      created_time: "27 July 2023",
      questions_numbers: 10,
      status: 0
   },

   {
      id: 2,
      title: "Trump aide Carlos De Oliveira’s journey from failed witness to defendant",
      banner: "images/image.svg",
      description: "A proffer session gone sour leads to an indictment, underscoring investigators’ hopes and fears about Trump staffers",
      key_word: ['proffer', 'trump'],
      content: "Within weeks of the Justice Department visit in early June, the FBI had gathered\
       evidence suggesting that Trump might not have turned over all the classified papers in his\
       possession. Between June 22 and 24, government officials discussed with Trump’s attorney and\
       then issued a subpoena for security camera footage to see if they could follow movements of\
       people and material inside the complex. Of particular interest were cameras in a hallway that led from residential space toward the storage room, the people familiar with the situation said.",
      estimate_time: "10 mins",
      author: "admin",
      created_time: "30 July 2023",
      questions_numbers: 20,
      status: 1
   },

   {
      id: 3,
      title: "Display Images In React - 2",
      banner: "images/image.svg",
      description: "There are several ways to import and use images in React. Sometimes, it seems not to work, and we will see why.",
      key_word: ['post_1', 'post_2'],
      content: "There are many variations of passages of Lorem Ipsum available, u \
         but the majority have suffered alteration in some form, by injected humour, or\
         randomised words which don't look even slightly believable. If you are going to\
         use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing\
         hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to\
         repeat predefined chunks as necessary, making this the first true generator on the Internet.\
         It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures,\
         to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free, \
         from repetition, injected humour, or non-characteristic words etc",
      estimate_time: "10 mins",
      author: "admin",
      created_time: "30 July 2023",
      questions_numbers: 20,
      status: 0
   },
]
const PostsPage = ({ TopicName }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);


   const [activeStep, setActiveStep] = useState(1);
   const maxSteps = posts_data.length;

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   return (
      <Container maxWidth='lg'>
         {/* Header */}
         <Box sx={{ mb: 2 }}>
            <Typography variant='h6' fontWeight="bold" >
               Home / Chemistry
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
   );
}

export default PostsPage;