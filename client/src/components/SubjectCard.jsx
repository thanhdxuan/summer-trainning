import { Box, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { tokens } from '../theme';
import { Chip } from '@mui/material';
import LinearProgressWithLabel from '../sences/posts/components/LinearProgressWithLabel';
import { useNavigate } from 'react-router-dom';

const SubjectCard = ({ cardInfo, userData }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const navigate = useNavigate();
   const cardValue = (userData === undefined) ? 0 : (userData['passed_count'] * 100 / cardInfo['num_posts'])
   const label = [
      'Easy',
      'Medium',
      'Hard'
   ]

   const label_color = [
      'success',
      'warning',
      'error'
   ]
   return (
      <Box
         display="flex"
         backgroundColor={colors.grayAccent[300]}
         borderRadius={4}
         sx={{
            '&:hover': {
               // borderBottom: 2,
               // borderBottomColor: colors.grayAccent[600],
               cursor: "pointer",
               boxShadow: "inset 0px -3px 1px 0px #b0b4fc",
            }
         }}
      >
         <Box sx={{ mx: 2, my: 2 }}>
            <img
               src={cardInfo['thumbnail']}
               alt="thumbnail" //TODO - Add an alternative image for
               style={{
                  borderRadius: 15,
                  width: 200,
                  height: 200
               }}
               loading="lazy"
            />
         </Box>
         <Box sx={{ my: 2 }} display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
               <Box
                  fontSize={{ xs: 15, md: 20 }}
                  fontWeight="bold"
                  onClick={() => navigate(`/topics/${cardInfo['id']}/posts`)}
                  sx={{
                     '&:hover': {
                        backgroundColor: 'primary',
                        opacity: [0.9, 0.8, 0.7],
                     }
                  }}
               >
                  {cardInfo['name']}
               </Box>
               <Box sx={{ pr: 2 }}>
                  <Typography
                     variant='h6'
                  >
                     {cardInfo['description']}
                  </Typography>
               </Box>
            </Box>
            <Box sx={{ width: '100%' }} fontWeight="bold">
               <Box>
                  <Box fontSize={{ xs: 8, md: 10 }}>
                     Completed
                     <LinearProgressWithLabel value={cardValue} color={cardValue === 100 ? "success" : (cardValue === 0 ? "error" : "warning")} />
                  </Box >
                  {/* <Box fontSize={{ xs: 8, md: 10 }}>
                     Correct Ratio
                     <LinearProgressWithLabel value={80} />
                  </Box> */}
               </Box>
               <Box display="flex" sx={{ mt: 1 }} gap={1}>
                  <Chip label={label[cardInfo['level'] - 1]} size='small' color={label_color[cardInfo['level'] - 1]} />
                  <Chip label={`${cardInfo['num_posts']} posts`} size='small' />
                  {/* <Box sx={{ pl: 15 }}>
                  <Button variant='outlined' color='info'>View</Button>
               </Box> */}
               </Box>
            </Box>
         </Box>
      </Box>
   );
}

export default SubjectCard;