import {
   Box,
   Container,
   IconButton,
   useTheme,
   Popper,
   List,
   ListItem,
   Typography,
   Grow,
   Divider,
   Button,
   Tooltip
} from '@mui/material';
import { useContext, useState, Fragment } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersionOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import ChangePasswordDialog from '../../components/ChangePasswordDialog';



const Topbar = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);
   const [open, setOpen] = useState(false);

   const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
   const [anchEl, setAnchorEl] = useState(null);
   const user = JSON.parse(sessionStorage.getItem("user"));
   const navigate = useNavigate();
   const handleClick = (_open) => {
      if (_open === true) {
         setOpen(false);
      }
      else {
         setOpen(true);
      }
   };

   const handleLogOut = () => {
      sessionStorage.removeItem("user");
      navigate("/signin");
   };

   const handleChangePassword = () => {
      setOpenPasswordDialog(true);
   };

   return (
      <Container>
         <Box display="flex" justifyContent="space-between" py={2} alignItems="center">
            {/* ICONS */}
            <Box
               display="flex"
               sx={{
                  '&:hover': {
                     cursor: 'pointer'
                  }
               }}
               onClick={() => { user ? navigate('/') : navigate('/signin') }}
            >
               <img
                  src='/images/logo/light-removebg.png'
                  style={{
                     height: 40
                  }}
               />
            </Box>
            <Box display="flex" alignItems="center">
               <Tooltip title="Change theme">
                  <IconButton onClick={colorMode.toggleColorMode}>
                     {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
                     ) : (
                        <LightModeOutlinedIcon></LightModeOutlinedIcon>
                     )}
                  </IconButton>
               </Tooltip>
               <Popper open={open} anchorEl={anchEl} placement='bottom-end' transition>
                  {({ TransitionProps }) => (
                     <Grow {...TransitionProps} timeout={350}>
                        <List
                           sx={{
                              boxShadow: 2,
                              borderRadius: 2,
                              px: 2,
                              bgcolor: colors.primary[100]
                           }}
                        >
                           <ListItem>
                              <Box display="flex" gap={2}>
                                 <Box>
                                    <Fragment>
                                       <Typography variant='h6' display='inline'>{`Hi, ${user.username}`}</Typography>
                                    </Fragment>
                                    <Box>
                                       <Typography variant='h6' display='inline'>{user.email}</Typography>
                                    </Box>
                                 </Box>
                                 <Tooltip title="Logout">
                                    <IconButton onClick={() => handleLogOut()}>
                                       <LogoutIcon />
                                    </IconButton>
                                 </Tooltip>
                              </Box>
                           </ListItem>
                           <Divider variant="middle" />
                           <ListItem>
                              <Button color="info" onClick={handleChangePassword}>
                                 Change password!
                              </Button>
                           </ListItem>
                        </List>
                     </Grow>
                  )}
               </Popper>
               {
                  user.is_admin && (
                     <Tooltip title="Admin Panel">
                        <IconButton component={Link} to="/admin">
                           <AdminPanelSettingsOutlinedIcon />
                        </IconButton>
                     </Tooltip>
                  )
               }
               <IconButton onClick={(event) => { handleClick(open); setAnchorEl(event.currentTarget); }}>
                  <PersionOutlinedIcon />
               </IconButton>
               <IconButton>
                  <SettingsOutlinedIcon />
               </IconButton>
            </Box>
         </Box >
         {openPasswordDialog && <ChangePasswordDialog open={openPasswordDialog} setOpen={setOpenPasswordDialog} />}
      </Container >
   );

}

export default Topbar;