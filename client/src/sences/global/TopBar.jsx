import { Box, IconButton, useTheme} from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersionOutlinedIcon from '@mui/icons-material/PersonOutlined'


const Topbar = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);

   return (
      <Box display="flex" justifyContent="space-between" p={2} alignItems="center">
         {/* ICONS */}
         <Box display="flex"> <IconButton onClick={colorMode.toggleColorMode}>
               {theme.palette.mode === 'dark' ? (
                  <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
               ) : (
                  <LightModeOutlinedIcon></LightModeOutlinedIcon>
               )}
            </IconButton>
            <IconButton>
               <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
               <PersionOutlinedIcon />
            </IconButton>
            <IconButton>
               <SettingsOutlinedIcon />
            </IconButton>
         </Box>
         <Box display="flex">
            <img
               src='/images/logo/light-removebg.png'
               style={{
                  height: 40
               }}
            />
         </Box>
      </Box>
   );

}

export default Topbar;