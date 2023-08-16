import { Container, useTheme, MobileStepper, Divider } from '@mui/material';
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
import NavigateBar from '../global/NavigateBar';
import Topbar from '../global/TopBar';




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


   return (
      <>
         <Topbar />
         <Divider flexItem />
         <Container maxWidth='lg'>
            {/* Navigate bar */}
            <NavigateBar pathInfor={[['Home', '/'], [topicName, '/'], ['Posts', '']]} />
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
         </Container>
      </>
   );
}

export default PostsPage;