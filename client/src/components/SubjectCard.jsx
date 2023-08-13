import { Box, useTheme, Paper, Grid, Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { tokens } from '../theme';
import { Chip } from '@mui/material';
import LinearProgressWithLabel from '../sences/posts/components/LinearProgressWithLabel';
import { useNavigate } from 'react-router-dom';

const SubjectCard = ({ cardInfo }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const navigate = useNavigate();

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
         // onClick={() => navigate(`/topics/${cardInfo['id']}/posts`)}
      >
         <Box sx={{ mx: 2, my: 2 }} width="50%">
            <img
               src={cardInfo['thumbnail']}
               style={{
                  borderRadius: 15,
                  width: '100%',
               }}
               loading="lazy"
            />
         </Box>
         <Box sx={{ my: 2 }} display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
               <Box fontSize={{ xs: 15, md: 20 }} fontWeight="bold">
                  <Link underline='hover' href={`/topics/${cardInfo['id']}/posts`} color='inherit'>
                     {cardInfo['name']}
                  </Link>
               </Box>
               <Box sx={{ pr: 2 }}>
                  <Typography
                     variant='h6'
                  >
                     Lorem Ipsum is simply dummynd typesetting industry................
                  </Typography>
               </Box>
            </Box>
            <Box sx={{ width: '100%' }} fontWeight="bold">
               <Box>
                  <Box fontSize={{ xs: 8, md: 10 }}>
                     Completed
                     <LinearProgressWithLabel value={39} />
                  </Box >
                  <Box fontSize={{ xs: 8, md: 10 }}>
                     Correct Ratio
                     <LinearProgressWithLabel value={80} />
                  </Box>
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