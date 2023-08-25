import { useTheme, Container, Divider, Box } from '@mui/material'
import { tokens } from '../../theme';
import NavigateBar from '../global/NavigateBar';
import Topbar from '../global/TopBar';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import CreatePost from './tabs/CreatePosts';
import CreateTopic from './tabs/CreateTopics';
import UserControl from "./tabs/UserControl";

import axios from 'axios';
import CreateQuestions from './tabs/CreateQuestions';

const AdminPanel = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [tabValue, setTabValue] = useState('1');
   const handleChange = (event, newValue) => {
      setTabValue(newValue);
   };

   const user = JSON.parse(sessionStorage.getItem('user'));
   const header = {
      'headers': {
         "x-access-token": user.token
      }
   };

   const getTopicData = async () => {
      return axios
         .get('/topics', header)
         .then((res) => res.data);
   };

   const getPostData = async (topicId) => {
      return axios
            .get(`/topics/${topicId}/posts`, header)
            .then((res) => res.data);
   };

   const getQuestionData = async (postId) => {
      return axios
            .get(`/posts/${postId}/questions`, header)
            .then((res) => res.data);
   };

   return (
      <>
         <Topbar />
         <Divider flexItem />
         <Container maxWidth='lg'>
            <NavigateBar pathInfor={[['Home', '/'], ['Admin', '']]} />
            <Box>
               <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <TabList onChange={handleChange} textColor="inherit" indicatorColor="secondary">
                        <Tab label='Users' value='1'></Tab>
                        <Tab label='Topics' value='2'></Tab>
                        <Tab label='Posts' value='3'></Tab>
                        <Tab label='Questions' value='4'></Tab>
                     </TabList>
                  </Box>
                  <TabPanel value='1' sx={{}}>
                     <UserControl />
                  </TabPanel>
                  <TabPanel value='2'>
                     <CreateTopic getTopicData={getTopicData} />
                  </TabPanel>
                  <TabPanel value='3'>
                     <CreatePost getTopicData={getTopicData} getPostData={getPostData} />
                  </TabPanel>
                  <TabPanel value='4'>
                     <CreateQuestions getTopicData={getTopicData} getPostData={getPostData} getQuestionData={getQuestionData} />
                  </TabPanel>
               </TabContext>
            </Box>
         </Container>
      </>
   );
}

export default AdminPanel;