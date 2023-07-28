import { useState } from 'react';
import { useTheme, Box, Typography, Paper, Stack, Chip, Avatar, Divider } from '@mui/material';
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
         title: "Display Images In React",
         banner: "images/image_1.svg",
         description: "There are several ways to import and use images in React. Sometimes, it seems not to work, and we will see why.",
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
               style={{
                  width: 600,
                  height: 400,
                  borderRadius: 10
               }}
            />
            <Box display="flex" flexDirection="column" sx={{ mx: 2 }} justifyContent="space-between" >
               {/* Title */}
               <Box>
                  <Box fontWeight={900} fontSize={{ xs: 30, md: 40 }} >
                     {data[0]['title']}
                  </Box>
                  {/* Description */}
                  <Box fontWeight={50} fontSize={{ xs: 14, md: 18 }} >
                     {data[1]['description']}
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                     {
                        Array.from(data[0]['key_word']).map((value, index) => (
                           <Chip label={'#' + value} key={index} size="small" />
                        ))
                     }
                  </Stack>

               </Box>
               <Box
                  display="flex" 
                  alignItems="center"
                  sx={{ 
                     py: 2,
                     bgcolor: colors.whiteAccent[100],
                     borderRadius: 2
                  }} 
               >
                  <Box sx={{ pl: 2 }}>
                     <Avatar
                        src='logo192.png'
                        sx={{
                           border: 1,
                           borderColor: colors.whiteAccent[600]
                        }}
                     />
                  </Box>
                  <Box sx={{ pl: 2 }}>
                     <Box fontWeight="bold">
                        {data[0]['author']}
                     </Box>
                     <Box display="flex" gap={1} alignItems="center">
                        <Box> {data[0]['created_time']} </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box> {data[0]['estimate_time'] + ' read'} </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box> {data[0]['questions_numbers'] + ' questions'} </Box>
                        <Chip
                           label={data[0]['status'] == 0 ? 'Not Completed' : 'Completed'}
                           color={data[0]['status'] == 0 ? 'warning' : 'success'}
                           size="small"
                        />
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Box>
         <Divider flexItem sx={{ my: 4 }}/>
         {/* Contents */}
         <Box sx={{ mt: 2 }}>
            {data[0]['content']}
         </Box>
      </Box>
   );
}

export default Post;