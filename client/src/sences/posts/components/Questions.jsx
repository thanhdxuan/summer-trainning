import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme, Box, Grid, Container, FormControl, FormControlLabel, FormLabel, FormHelperText, RadioGroup, Radio } from '@mui/material';
import { Typography } from '@mui/material';
import { tokens } from '../../../theme';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const dummyQuestions = [
   {
      id: 1,
      description: "How are you?",
      key: ['Fine', 'Bad', 'Not good', 'None'],
      ans: 1
   },

   {
      id: 2,
      description: "What your name?",
      key: ['Fine', 'Thanh', 'Not good', 'None'],
      ans: 1
   },

   {
      id: 3,
      description: "Can you help me?",
      key: ['Fine', 'Bad', 'Not good', 'None'],
      ans: 3
   },

   {
      id: 4,
      description: "How are you?",
      key: ['Fine', 'Bad', 'Not good', 'None'],
      ans: 1
   }
]


export default function ListQuestions({ numquestions }) {
   const [open, setOpen] = useState(false);
   const [selectedOptions, setSelectedOptions] = useState({});
   const [helperText, setHelperText] = useState('');
   const [formErrors, setFormErrors] = useState({});
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
            setHelperText('');
            setFormErrors({});
         }
      }
   }, [open]);


   const handleRadioChange = (questionId, answer) => {
      setSelectedOptions((prevSelectedOptions) => ({
         ...prevSelectedOptions,
         [questionId]: answer,
      }));
      setFormErrors({ ...formErrors, [questionId]: false });
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      if (Object.keys(selectedOptions).length != dummyQuestions.length) {
         setHelperText('You need answer all questions!')
      }

      const unansweredQuestions = dummyQuestions.filter(
         (question) => !selectedOptions[`question_${question.id}`]
      );

      if (unansweredQuestions.length > 0) {
         const errors = {};
         unansweredQuestions.forEach((question) => {
            errors[`question_${question.id}`] = true;
         });
         setFormErrors(errors);

      } else {

         let correct = 0;
         for (let i = 0; i < dummyQuestions.length; i++) {
            if (dummyQuestions[i].ans == selectedOptions[`question_${dummyQuestions[i].id}`]) {
               correct = correct + 1;
            }
         }
         console.log(`You got ${correct} questions!`);
      }


   }
   function Question({ question, index }) {
      return (
         <FormControl key={index}>
            <FormLabel color="secondary" sx={{ fontWeight: 700 }} >Question {index + 1}: {question['description']}</FormLabel>
            <RadioGroup
               name={`question_${question.id}`}
               value={selectedOptions[`question_${question.id}`] || ''}
               onChange={(e) => handleRadioChange(`question_${question.id}`, e.target.value)}
               sx={{ ml: 2 }}
               required
            >
               <FormControlLabel control={<Radio color="secondary" />} value={0} label={question['key'][0]} />
               <FormControlLabel control={<Radio color="secondary" />} value={1} label={question['key'][1]} />
               <FormControlLabel control={<Radio color="secondary" />} value={2} label={question['key'][2]} />
               <FormControlLabel control={<Radio color="secondary" />} value={3} label={question['key'][3]} />
            </RadioGroup>
            {formErrors[`question_${question.id}`] && (
               <Typography variant="body2" color="error">
                  Please answer this question.
               </Typography>
            )}
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
                     <Button
                        // onClick={handleClose}
                        type="submit"
                        color="secondary"
                        size="large"
                        variant='outlined'
                        sx={{
                           mt: 2
                        }}
                     >
                        Submit
                     </Button>

                     <Typography variant="body2" color="error">
                        {helperText}
                     </Typography>
                  </form>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="secondary">Cancel</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
