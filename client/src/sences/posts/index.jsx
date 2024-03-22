import { Container, useTheme, MobileStepper, Divider, Tooltip } from '@mui/material';
import { tokens } from '../../theme';
import { useState, useEffect, useCallback } from 'react';
import Post from './components/post';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import NoPost from './components/NoPost';
import NavigateBar from '../global/NavigateBar';
import Topbar from '../global/TopBar';
import axios from 'axios';




const PostsPage = ({ topicInfor }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { topicId } = useParams();

   const [topicName, setTopicName] = useState("Null");
   const [activeStep, setActiveStep] = useState(0);
   const [allPostData, setAllPostData] = useState([]);
   const [maxSteps, setMaxSteps] = useState(0);

   const [openHistory, setOpenHistory] = useState(false);
   const user = JSON.parse(sessionStorage.getItem('user'));
   const [postData, setPostData] = useState({
      "history": [],
      "questions": [],
      "status": false
   });

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };
   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const getAllPostData = useCallback(async () => {
      return axios
         .get(`/topics/${topicId}/posts`)
         .then((res) => res.data)
   }, [topicId]);
   const getPostData = useCallback(async (postId) => {
      return axios
         .get(`/posts/${user.uid}/${postId}/status`)
         .then((res) => res.data);
   }, [user.uid]);

   useEffect(
      () => {
         getAllPostData().then((data) => {
            setAllPostData(data['posts']);
            setMaxSteps(data['posts'].length);
            setTopicName(data['topic_name']);
            if (data['posts'].length) {
               getPostData(data['posts'][activeStep]['_id']).then((data) => setPostData(data));
            }
         });
      }, [getAllPostData, getPostData, activeStep]
   );
   useEffect(
      () => {
         if (allPostData.length) {
            getPostData(allPostData[activeStep]['_id']).then((data) => setPostData(data));
         }

      }, [activeStep, openHistory, getPostData, allPostData]
   );

   return (
      <>
         <Topbar />
         <Divider flexItem />
         <Container maxWidth='lg'>
            {/* Navigate bar */}
            <NavigateBar pathInfor={[['Home', '/'], [topicName, '/'], ['Posts', '']]} />
            {
               (allPostData.length !== 0) ?
                  <>
                     <Post postInfor={allPostData[activeStep]} postData={postData} setPostData={setPostData} openHistory={openHistory} setOpenHistory={setOpenHistory} />
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
                           <Tooltip title={!postData['status'] ? "You must passed the test to go to the next posts!" : ""}>
                              <span>
                                 <Button
                                    onClick={handleNext}
                                    color="secondary"
                                    disabled={(!postData['status'] && !user.is_admin) || activeStep === maxSteps - 1}
                                 >
                                    Next
                                    <KeyboardArrowRight />
                                 </Button>
                              </span>
                           </Tooltip>
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