import {
   TableContainer,
   TableHead,
   TableCell,
   Paper,
   Table,
   TableBody,
   TableRow,
   IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { useEffect, useState } from "react";
import VerifyDialog from "../components/VerifyDialog";

const UserControl = () => {
   const [userData, setUserData] = useState([]);
   const [activateDialog, setActivateDialog] = useState(false);
   const [deactiveDialog, setDeactiveDialog] = useState(false);
   const [userToActivate, setUserToActivate] = useState("");
   const [userToDeactivate, setUserToDeactivate] = useState("");


   const [message, setMessage] = useState({
      message: "",
      description: ""
   });

   const activeMessage = {
      type: "active",
      message: `Do you want to activate the user: ${userToActivate} ?`,
      description: "This user can login to our website after activated."
   };

   const deactiveMessage = {
      type: "deactive",
      message: `Do you want to deactivate the user: ${userToActivate} ?`,
      description: "This user can not login to our website after deactivated."
   };

   const handleCloseDialog = (event) => {
      event.preventDefault()

      let dialogType = event.target.getAttribute("typ");
      if (event.target.value !== undefined 
         && event.target.value === 'true'
         && dialogType === 'active') {
         activateUser(userToActivate).then((data) => {
            if (data.status == 201) {
               console.log("Success");
            }
            else {
               console.log("Failed!");
            }
         });
      }
      else if (event.target.value !== undefined 
         && event.target.value === 'true'
         && dialogType === 'deactive') {
         deactivateUser(userToDeactivate).then((data) => {
            if (data.status == 201) {
               console.log("Success");
            }
            else {
               console.log("Failed!");
            }
         });
      }
      setActivateDialog(false);
   };
   const getUserData = async () => {
      return axios
         .get('/users/all')
         .then((res) => res.data);
   };

   const activateUser = async (username) => {
      const formData = new FormData();
      formData.append('username', username);

      return axios
         .post('/users/activate', formData)
         .then((res) => {
            return {
               message: res.data,
               status: res.status
            };
         });
   };

   const deactivateUser = async (username) => {
      const formData = new FormData();
      formData.append('username', username);

      return axios
         .post('/users/deactivate', formData)
         .then((res) => {
            return {
               message: res.data,
               status: res.status
            };
         });
   };

   useEffect(
      () => {
         getUserData().then((data) => setUserData(data));
      }, []
   );

   useEffect(
      () => {
         getUserData().then((data) => setUserData(data));
      }, [activateDialog]
   );
   return (
      <>
         <TableContainer component={Paper}>
            <Table size="small">
               <TableHead>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Joined Date</TableCell>
                  <TableCell align="center">Admin</TableCell>
                  <TableCell align="center">Active</TableCell>
                  <TableCell>Activate</TableCell>
               </TableHead>
               <TableBody>
                  {
                     userData.map((value, index) => (
                        <TableRow key={value._id}>
                           <TableCell >{value._id}</TableCell>
                           <TableCell >{value.username}</TableCell>
                           <TableCell >{value.email}</TableCell>
                           <TableCell >{value.created_date}</TableCell>
                           <TableCell align="center">{(value.is_admin) ? `*` : ``}</TableCell>
                           <TableCell align="center">{value.is_active ? `*` : ``}</TableCell>
                           {!value.is_active && (
                              <TableCell>
                                 <IconButton onClick={(event) => {
                                       setActivateDialog(true);
                                       setUserToActivate(value.username)
                                       setMessage(activeMessage);
                                    }}>
                                    <CheckIcon />
                                 </IconButton>
                              </TableCell>
                           )}
                           {value.is_active && (
                              <TableCell>
                                 <IconButton onClick={(event) => {
                                       setActivateDialog(true);
                                       setUserToDeactivate(value.username);
                                       setMessage(deactiveMessage);
                                    }}>
                                    <CloseIcon />
                                 </IconButton>
                              </TableCell>
                           )}
                        </TableRow>
                     ))
                  }
               </TableBody>
            </Table>
         </TableContainer>
         <VerifyDialog message={message} open={activateDialog} handleClose={handleCloseDialog} />
      </>
   );

};
export default UserControl;