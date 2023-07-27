import { useState } from 'react';
import { useTheme, Box, Typography, Paper } from '@mui/material';
import { tokens } from '../../../theme';
import LinearProgressWithLabel from './LinearProgressWithLabel';

const Post = ({ title }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [activeStep, setActiveStep] = useState(0);
   const maxStep = 2;

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const data = [
      {
         title: "This is title",
         banner: "images/image.svg",
         description: "This is dummy description",
         key_word: ['post_1', 'post_2'],
         content: "There are many variations of passages of Lorem Ipsum available, u \
         but the majority have suffered alteration in some form, by injected humour, or\
         randomised words which don't look even slightly believable. If you are going to\
         use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing\
         hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc",
         estimate_time: "x mins",
         created_time: "27 July 2023",
         questions_numbers: 10
      },

      {
         title: "This is title 1",
         banner: "images/image_1.svg",
         description: "This is dummy description",
         key_word: ['post_1', 'post_2'],
         content: "This is content",
         estimate_time: "x mins",
         created_time: "28 July 2023",
         questions_numbers: 10
      }
   ]
   return (
      <Box width="100%" sx={{ px: 2, py: 2, bgcolor: colors.grayAccent[100], boxShadow: 2, borderRadius: 2 }}>
         {/* Banner */}
         <Box display="flex">
            {/* Thumbnail */}
            <img
               src="https://source.unsplash.com/random?wallpapers"
               width="60%"
            />
            <Box display="flex" flexDirection="column" sx={{ mx: 2 }}>
               <Box fontWeight="Bold" fontSize={25} >
                  This is title. What is I..........................
               </Box>
            </Box>
         </Box>

         {/* Contents */}
         <Box sx={{ mt: 2 }}>

            {data[0]['content']}
         </Box>
      </Box>
   );
}

export default Post;