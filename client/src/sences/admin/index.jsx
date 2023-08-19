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
const AdminPanel = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [tabValue, setTabValue] = useState('1');
   const handleChange = (event, newValue) => {
      setTabValue(newValue);
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
                     </TabList>
                  </Box>
                  <TabPanel value='1' sx={{}}>
                     <UserControl />
                  </TabPanel>
                  <TabPanel value='2'>
                     <CreateTopic />
                  </TabPanel>
                  <TabPanel value='3'>
                     <CreatePost />
                  </TabPanel>
               </TabContext>
            </Box>
         </Container>
      </>
   );
}

export default AdminPanel;