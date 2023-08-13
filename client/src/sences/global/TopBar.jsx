import { Box, Container, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersionOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from 'react-router-dom';



const Topbar = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);

   return (
      <Container>
         <Box display="flex" justifyContent="space-between" py={2} alignItems="center">
            {/* ICONS */}
            <Box display="flex">
               <img
                  src='/images/logo/light-removebg.png'
                  style={{
                     height: 40
                  }}
               />
            </Box>
            <Box display="flex" alignItems="center">
               <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === 'dark' ? (
                     <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
                  ) : (
                     <LightModeOutlinedIcon></LightModeOutlinedIcon>
                  )}
               </IconButton>
               <IconButton component={Link} to="/admin">
                  <AdminPanelSettingsOutlinedIcon />
               </IconButton>
               <IconButton>
                  <PersionOutlinedIcon />
               </IconButton>
               <IconButton>
                  <SettingsOutlinedIcon />
               </IconButton>
            </Box>
         </Box >
      </Container>
   );

}

export default Topbar;