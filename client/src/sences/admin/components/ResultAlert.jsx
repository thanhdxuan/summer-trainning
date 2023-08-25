import {
   Grow,
   Alert,
   IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';


const ResultAlert = ({ success, type, alertOpen, setAlertOpen }) => {
   return (
      <Grow in={alertOpen}>
         <Alert
            severity={success ? "success" : "warning"}
            color={success ? "success" : "error"}
            action={
               <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                     setAlertOpen(false);
                  }}
               >
                  <CloseIcon fontSize="inherit" />
               </IconButton>
            }
         >
            {success && (
               `Create ${type} successfully!`
            )}
            {!success && (
               `Failed! \n Please try again!`
            )}
         </Alert>
      </Grow>
   );
};

export default ResultAlert;