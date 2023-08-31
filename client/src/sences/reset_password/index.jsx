import { Button } from "@mui/material";
import { Container, Grid, Box, TextField, Typography, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import ResultAlert from "../../components/ResultAlert";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
   const [newPass, setNewPass] = useState("");
   const [confirmPass, setConfirmPass] = useState("");
   const [isValid, setIsValid] = useState(false);
   const [errorText, setErrorText] = useState("");
   const [openAlert, setOpenAlert] = useState(false);
   const [success, setSuccess] = useState(false);
   const { token } = useParams();
   useEffect(
      () => {
         axios.get(`/reset_password/${token}/verify`)
            .then(res => {
               setIsValid(true);
            })
            .catch(err => {
               setIsValid(false);
            })
      }
   )
   const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('new_pass', newPass);
      axios.post(`/reset_password/${token}/submit`, formData)
         .then(res => {
            setSuccess(true);
            setOpenAlert(true);
         })
         .catch(err => {
            setSuccess(false);
            setOpenAlert(true);
         })
   }

   if (!isValid) {
      return (
         <Container maxWidth='sm' sx={{ pt: 10 }}>
            <Typography variant="h1">Page not found</Typography>
         </Container>
      );
   }
   return (
      <Container maxWidth='sm' sx={{ pt: 10 }}>
         <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={6}>
               <Typography variant="h3">
                  Reset your password
               </Typography>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
               <TextField
                  id='retype-password'
                  label="Retype new password"
                  color="info"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  fullWidth
               />
               {
                  (newPass !== confirmPass) && (
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
            <Grid item xs={12}>
               <Box display="flex" justifyContent="flex-end">
                  <Button color="success" variant="outlined" onClick={(e) => handleSubmit(e)}
                     disabled={newPass !== confirmPass || newPass === ""}
                  >
                     Submit
                  </Button>
               </Box>
            </Grid>
            {openAlert &&
               <ResultAlert
                  success={success}
                  succeed_message={"Reset password is successfully! Login now!"}
                  failed_message={"Something went wrong!"}
                  alertOpen={openAlert}
                  setAlertOpen={setOpenAlert}
               />
            }
         </Grid>
      </Container>
   );
}

export default ResetPassword;