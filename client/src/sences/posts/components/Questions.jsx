import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme, Box, Grid, Container, FormControl, FormControlLabel, FormLabel, FormHelperText, RadioGroup, Radio } from '@mui/material';
import { tokens } from '../../../theme';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const dummyQuestions = [
   {
      description: "How are you?",
      key: ['Fine', 'Bad', 'Not good', 'None'],
      ans: 1
   },

   {
      description: "What your name?",
      key: ['Fine', 'Thanh', 'Not good', 'None'],
      ans: 1
   },

   {
      description: "Can you help me?",
      key: ['Fine', 'Bad', 'Not good', 'None'],
      ans: 3
   },

   {
      description: "How are you?",
      key: ['Fine', 'Bad', 'Not good', 'None'],
      ans: 1
   }
]


export default function ListQuestions({ numquestions }) {
   const [open, setOpen] = useState(false);
   const [selectedOptions, setSelectedOptions] = useState({});
   const [scroll, setScroll] = useState('paper');
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const descriptionElementRef = useRef(null);
   useEffect(() => {
      if (open) {
         const { current: descriptionElement } = descriptionElementRef;
         if (descriptionElement !== null) {
            descriptionElement.focus();
         }

         if (selectedOptions) {
            setSelectedOptions({});
         }
      }
   }, [open]);

   const handleRadioChange = (event) => {
      const { name, value } = event.target;
      setSelectedOptions((prevSelectedOptions) => ({
         ...prevSelectedOptions,
         [name]: value,
      }));
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      console.log(selectedOptions);
   }
   function Question({ question, index }) {
      return (
         <FormControl>
            <FormLabel color="secondary" sx={{ fontWeight: 700 }} >Question {index + 1}: {question['description']}</FormLabel>
            <RadioGroup
               name={String(index)}
               value={selectedOptions[index]}
               onChange={handleRadioChange}
               sx={{ ml: 2 }}
            >
               <FormControlLabel control={<Radio color="secondary" />} value={0} label={question['key'][0]} />
               <FormControlLabel control={<Radio color="secondary" />} value={1} label={question['key'][1]} />
               <FormControlLabel control={<Radio color="secondary" />} value={2} label={question['key'][2]} />
               <FormControlLabel control={<Radio color="secondary" />} value={3} label={question['key'][3]} />
            </RadioGroup>
         </FormControl>
      );
   }
   return (
      <div>
         <Button onClick={handleClickOpen('paper')} color="secondary" size="large" variant='outlined'>
            Answer Questions
            <KeyboardArrowRight />
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth='md'
            sx={{
               maxHeight: "75%",
               position: "absolute",
               top: "10%",
            }}
         >
            <DialogTitle id="scroll-dialog-title" color="secondary">Questions</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
               <Grid container
                  width={{ xs: 500, md: 800 }}
                  sx={{ px: 4 }}
                  spacing={4}
                  alignItems="center"
               >
                  <form onSubmit={handleSubmit}>
                     {
                        dummyQuestions.map((value, index) => (
                           <Grid item xs={12} key={index} sx={{ pt: 3 }}>
                              <Question question={value} index={index} />
                           </Grid>
                        ))
                     }
                     <Button onClick={handleClose} type="submit" color="secondary">Submit</Button>
                  </form>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="secondary">Cancel</Button>
               <Button onSubmit={handleSubmit} type="submit" color="secondary">Submit</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
