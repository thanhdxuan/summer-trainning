import { useState } from 'react';
import { useTheme, Box, Typography, Paper, Stack, Chip, Avatar, Divider, Button } from '@mui/material';
import { tokens } from '../../../theme';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const Post = ({ postInfor }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

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
                     {postInfor['title']}
                  </Box>
                  {/* Description */}
                  <Box fontWeight={50} fontSize={{ xs: 14, md: 18 }} >
                     {postInfor['description']}
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                     {
                        Array.from(postInfor['key_word']).map((value, index) => (
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
                        {postInfor['author']}
                     </Box>
                     <Box display="flex" gap={1} alignItems="center">
                        <Box> {postInfor['created_time']} </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box> {postInfor['estimate_time'] + ' read'} </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box> {postInfor['questions_numbers'] + ' questions'} </Box>
                        <Chip
                           label={postInfor['status'] == 0 ? 'Not Completed' : 'Completed'}
                           color={postInfor['status'] == 0 ? 'warning' : 'success'}
                           size="small"
                        />
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Box>
         <Divider flexItem sx={{ my: 4 }} />
         {/* Contents */}
         <Box sx={{ mt: 2 }}>
            <Typography variant='h4'>
               {postInfor['content']}
            </Typography>
            <Box sx={{ my: 2 }}>
               <Button color="secondary" size="large" variant='outlined'>
                  Answer Questions
                  <KeyboardArrowRight />
               </Button>
            </Box>
         </Box>
      </Box>
   );
}

export default Post;