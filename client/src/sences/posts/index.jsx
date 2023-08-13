import { Typography, Box, Stack, Container, useTheme, MobileStepper } from '@mui/material';
import { tokens } from '../../theme';
import { useState, useEffect } from 'react';
import Post from './components/post';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import NoPost from './components/NoPost';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';




const PostsPage = ({ topicInfor }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { topicId } = useParams();

   const [topicName, setTopicName] = useState("Null");
   const [activeStep, setActiveStep] = useState(0);
   const [posts_data, setPostData] = useState([]);
   const [maxSteps, setMaxSteps] = useState(0);

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };
   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleClickBar = (event) => {
      event.preventDefault();

   };

   useEffect(
      () => {
         fetch(`/topics/${topicId}/posts`)
            .then(res => res.json())
            .then(data => {
               setMaxSteps(data['posts'].length);
               setPostData(data['posts']);
               setTopicName(data['topic_name']);
            })
            .catch(err => console.log(err))
      }, []
   );

   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" href="/">
         Home
      </Link>,
      <Link
         underline="none"
         key="2"
         color="inherit"
         onClick={handleClickBar}
      >
         {topicName}
      </Link>,
      <Typography key="3" color="text.primary">
         Posts
      </Typography>,
   ];

   return <Container maxWidth='lg'>
      {/* Navigate bar */}
      <Box sx={{ my: 2 }}>
         <Stack spacing={2}>
            <Breadcrumbs
               separator={<NavigateNextIcon fontSize="small" />}
               aria-label="breadcrumb"
            >
               {breadcrumbs}
            </Breadcrumbs>
         </Stack>
      </Box>
      {
         (posts_data.length != 0) ?
            <>
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
                        <KeyboardArrowLeft />
                        Back
                     </Button>
                  }
               />
            </>
            : <NoPost color={colors} />
      }
   </Container>;
}

export default PostsPage;