import {
   Grow,
   Alert,
   IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';


const ResultAlert = ({ success, succeed_message, failed_message, alertOpen, setAlertOpen }) => {
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
               `${succeed_message}`
            )}
            {!success && (
               `${failed_message}`
            )}
         </Alert>
      </Grow>
   );
};

export default ResultAlert;