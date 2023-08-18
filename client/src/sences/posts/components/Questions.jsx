import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
   useTheme,
   Grid,
   FormControl,
   FormControlLabel,
   FormLabel,
   RadioGroup,
   Radio,
   Alert,
   Grow,
   IconButton
} from '@mui/material';
import { Typography } from '@mui/material';
import { tokens } from '../../../theme';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
const ResultAlert = ({ message, passed, alertOpen, setAlertOpen, setDialogOpen }) => {
   return (
      <Dialog open={alertOpen}>
         <Grow in={alertOpen}>
            <Alert
               severity={passed ? "success" : "warning"}
               color={passed ? "success" : "error" }
               action={
                  <IconButton
                     aria-label="close"
                     color="inherit"
                     size="small"
                     onClick={() => {
                        setAlertOpen(false);
                        setDialogOpen(false);
                     }}
                  >
                     <CloseIcon fontSize="inherit" />
                  </IconButton>
               }
            >
               {passed && (
                  `Corrected ${message} questions! \nGo to the next post!`
               )}
               {!passed && (
                  `Corrected ${message} questions! \nYou is required correct all the questions to go for next post!`
               )}
            </Alert>

         </Grow>
      </Dialog>
   );
};

export default function ListQuestions({ questions, postId, setPostData, postData }) {
   const [open, setOpen] = useState(false);
   const [passed, setPassed] = useState(false);
   const [result, setResult] = useState("");
   const [alertOpen, setAlertOpen] = useState(false);
   const [selectedOptions, setSelectedOptions] = useState({});
   const [helperText, setHelperText] = useState('');
   const [formErrors, setFormErrors] = useState({});
   const [scroll, setScroll] = useState('paper');
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const user = JSON.parse(sessionStorage.getItem('user'));
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

      let correct = 0;
      var passed = false;
      if (Object.keys(selectedOptions).length != questions.length) {
         setHelperText('You need answer all questions!')
      }

      const unansweredQuestions = questions.filter(
         (question) => !selectedOptions[`question_${question._id}`]
      );

      if (unansweredQuestions.length > 0) {
         const errors = {};
         unansweredQuestions.forEach((question) => {
            errors[`question_${question._id}`] = true;
         });
         setFormErrors(errors);

      } else {
         for (let i = 0; i < questions.length; i++) {
            console.log(questions[i].answer, selectedOptions[`question_${questions[i]._id}`]);
            if (questions[i].answer == (parseInt(selectedOptions[`question_${questions[i]._id}`]) + 1)) {
               correct = correct + 1;
            }
         }
         if (correct === questions.length) passed = true;
      }

      const data = new FormData(event.currentTarget);
      data.append('post_id', postId);
      data.append('public_id', user.uid);
      data.append('passed', passed);
      data.append('score', correct);
      axios({
         method: 'post',
         url: 'http://localhost:5000/users/test/submit',
         data: data
      })
         .then((res) => {
            if (res.status === 201) {
               console.log("Successfully!");
            }
            else {
               console.log("Failed!");
            }
         })
         .catch((res) => {
            console.log(res);
         });
      
      setAlertOpen(true);
      setPassed(passed);
      setResult(`${correct}/${questions.length}`)
      if (postData['status'] === false && passed) {
         setPostData({...postData, 'status': passed});
      } else {
         let prevHistory = postData['history'];
         setPostData({...postData, 'status': passed});
      }
   };



   function Question({ question, index }) {
      return (
         <FormControl key={index}>
            <FormLabel color="secondary" sx={{ fontWeight: 700 }} >Question {index + 1}: {question.content}</FormLabel>
            <RadioGroup
               name={`question_${question._id}`}
               value={selectedOptions[`question_${question._id}`] || ''}
               onChange={(e) => handleRadioChange(`question_${question._id}`, e.target.value)}
               sx={{ ml: 2 }}
               required
            >
               <FormControlLabel control={<Radio color="secondary" />} value={0} label={question.op_a} />
               <FormControlLabel control={<Radio color="secondary" />} value={1} label={question.op_b} />
               <FormControlLabel control={<Radio color="secondary" />} value={2} label={question.op_c} />
               <FormControlLabel control={<Radio color="secondary" />} value={3} label={question.op_d} />
            </RadioGroup>
            {formErrors[`question_${question._id}`] && (
               <Typography variant="body2" color="error">
                  Please answer this question.
               </Typography>
            )}
         </FormControl>
      );
   };

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
                        questions.map((value, index) => (
                           <Grid item xs={12} key={index} sx={{ pt: 3 }}>
                              <Question question={value} index={index} />
                           </Grid>
                        ))
                     }
                     <Button
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
                     <ResultAlert message={result} passed={passed} alertOpen={alertOpen} setAlertOpen={setAlertOpen} setDialogOpen={setOpen} />

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
