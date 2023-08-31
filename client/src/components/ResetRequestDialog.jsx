import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Button, FormHelperText } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ResultAlert from "./ResultAlert";

const ResetRequestDialog = ({ open, setOpen }) => {
   const [email, setEmail] = useState("");
   const [helperText, setHelperText] = useState("");
   const [success, setSuccess] = useState(false);
   const [resAlert, setResAlert] = useState(false);
   const handleClose = () => {
      setOpen(false);
   };

   const handleResetRequest = (event) => {
      event.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         setHelperText("Email is invalid!");
      }
      else {
         sendEmail(email)
            .then(data => {
               setSuccess(true);
               setResAlert(true);
               console.log(data);
            })
            .catch(err => {
               setSuccess(false);
               setResAlert(true);
               console.log(err);
            });
      }
   };

   const sendEmail = async (email) => {
      const formData = new FormData();

      formData.append('email', email);
      return axios.post('/reset_password', formData)
         .then(res => res.data);
   };
   return (
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
         <DialogTitle>Reset password</DialogTitle>
         <DialogContent>
            <TextField
               color="info"
               label="Enter your email"
               value={email}
               fullWidth
               sx={{ mt: 2 }}
               onChange={(e) => {
                  setEmail(e.target.value);
                  setHelperText("");
               }}
            />
            {helperText && <FormHelperText error>{helperText}</FormHelperText>}
         </DialogContent>
         <DialogActions>
            <Box display="flex" justifyContent="flex-end" gap={2}>
               <Button color="error" onClick={(event) => handleClose()}>
                  Cancle
               </Button>
               <Button color="success"
                  onClick={(event) => handleResetRequest(event)}
                  disabled={email === ""}
               >
                  Submit
               </Button>
            </Box>
         </DialogActions>
         {resAlert &&
            <ResultAlert
               success={success}
               succeed_message={"Please check your email and follow the instructions!"}
               failed_message={"Your email don't exists!"}
               alertOpen={resAlert}
               setAlertOpen={setResAlert}
            />
         }
      </Dialog>
   );
};

export default ResetRequestDialog;
