import {
   Box,
   Button,
   Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid, TextField
} from "@mui/material";
import axios from "axios";

import { useState } from "react";
import ResultAlert from "./ResultAlert";

const ChangePasswordDialog = ({ open, setOpen }) => {
   const [currPass, setCurrPass] = useState("");
   const [newPass, setNewPass] = useState("");
   const [retypePass, setRetypePass] = useState("");
   const [errorText, setErrorText] = useState("");
   const [resAlert, setResAlert] = useState(false);
   const [success, setSuccess] = useState(false);
   const user = JSON.parse(sessionStorage.getItem('user'));
   const handleClose = () => {
      setOpen(false);
   };
   const handleChangePass = (event) => {
      const formData = new FormData();

      formData.append('current_pass', currPass);
      formData.append('new_pass', newPass);
      formData.append('uid', user.uid)

      axios
         .post('/change_password/submit', formData)
         .then(res => {
            setSuccess(true);
            setResAlert(true);
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
               setErrorText("Current password is incorrect! Please try again!");
            }
            else {
               setSuccess(false);
               setResAlert(true);
            }
         })
   };
   return (
      <>
         <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
            <DialogTitle>Change password</DialogTitle>
            <DialogContent>
               <Grid container flexDirection='column' sx={{ mt: 2 }} spacing={2}>
                  <Grid item>
                     <TextField
                        id='curr-password'
                        label="Current password"
                        color="info"
                        type="password"
                        value={currPass}
                        onChange={(e) => {
                           setCurrPass(e.target.value);
                           setErrorText("");
                        }}
                        fullWidth
                     />
                  </Grid>
                  <Grid item>
                     <TextField
                        id='new-password'
                        label="New password"
                        color="info"
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        fullWidth
                     />
                  </Grid>
                  <Grid item>
                     <TextField
                        id='retype-password'
                        label="Retype new password"
                        color="info"
                        type="password"
                        value={retypePass}
                        onChange={(e) => setRetypePass(e.target.value)}
                        fullWidth
                     />
                     {
                        (newPass !== retypePass) && (
                           <FormHelperText error>
                              Not match to your new password
                           </FormHelperText>
                        )
                     }
                     {
                        (errorText) && (
                           <FormHelperText error>
                              {errorText}
                           </FormHelperText>
                        )
                     }
                  </Grid>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button color="error" onClick={(event) => handleClose()}>
                     Cancle
                  </Button>
                  <Button color="success" onClick={(event) => handleChangePass(event)} disabled={newPass !== retypePass || newPass === "" || currPass === ""}>
                     Submit
                  </Button>
               </Box>
            </DialogActions>
            {resAlert &&
               <ResultAlert
                  success={success}
                  succeed_message={" Update password successfully!"}
                  failed_message={"Failed! Please try again!"}
                  alertOpen={resAlert}
                  setAlertOpen={setResAlert}
               />
            }
         </Dialog>
      </>
   );
};

export default ChangePasswordDialog;