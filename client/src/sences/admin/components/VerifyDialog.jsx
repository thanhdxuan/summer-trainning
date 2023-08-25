import {
   Dialog,
   DialogTitle,
   DialogContent,
   Button,
   Box,
   DialogActions,
   DialogContentText,
} from '@mui/material';


const VerifyDialog = ({ message, open, handleClose }) => {
   return (
      <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
            {message.message}
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               {message.description}
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Box display="flex" sx={{ my: 2, mx: 2 }} gap={2}>
               <Button variant="contained" color="error" typ={message.type} value={false} onClick={(event) => handleClose(event)}>Disagree</Button>
               <Button variant="contained" color="success" typ={message.type} value={true} onClick={(event) => handleClose(event)} autoFocus>
                  Agree
               </Button>
            </Box>
         </DialogActions>
      </Dialog>
   );
}

export default VerifyDialog;