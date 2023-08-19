import {
   Box,
   Grid,
   TextField,
   MenuItem,
   Button,
   LinearProgress,
   FormControl,
   InputLabel,
   Select,
   FormHelperText,
   Alert,
   Grow,
   Typography,
   Paper,
   Table,
   TableBody,
   TableRow,
   TablePagination,
   IconButton,
   TableContainer,
   TableHead,
   TableCell,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import TopicIcon from '@mui/icons-material/Topic';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import axios from "axios";
import VerifyDialog from "../components/VerifyDialog";

const ResultAlert = ({ success, alertOpen, setAlertOpen }) => {
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
               `Create post successfully!`
            )}
            {!success && (
               `Failed! \n Please try again!`
            )}
         </Alert>
      </Grow>
   );
};

const levelLabel = ['Easy', 'Medium', 'Hard'];
const CreateTopic = () => {
   const [selectedFiles, setSelectedFiles] = useState([]);
   const [topicData, setTopicData] = useState([]);
   const [helperText, setHelperText] = useState("Please upload the topic thumbnail");
   const [level, setLevel] = useState(1);
   const [alertOpen, setAlertOpen] = useState(false);
   const [success, setSuccess] = useState(false);
   const [message, setMessage] = useState("");
   const [topicToDel, setTopicToDel] = useState(0);
   const [openDelDialog, setOpenDelDialog] = useState(false);
   const deleteMessage = {
      type: "deleteTopic",
      message: `Do you want to delete this topic (id = ${topicToDel}) with its posts?`,
   }

   const user = JSON.parse(sessionStorage.getItem('user'));

   const handleFileChange = (event) => {
      setSelectedFiles(event.target.files);
      setHelperText(`Uploaded file: ${event.target.value.split('\\').pop()}`)
   };
   const handleLevelChange = (event) => {
      setLevel(event.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('name', event.target['topic_name'].value);
      formData.append('description', event.target['description'].value);
      formData.append('level', level);
      formData.append('thumbnail', event.target['thumbnail'].value.split('\\').pop()); //get file name
      formData.append('file', selectedFiles[0]);
      console.log(formData.get('file'));
      axios
         .post('/topics/add', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            }
         })
         .then((res) => {
            if (res.status === 201) {
               setAlertOpen(true);
               setSuccess(true);
               event.target['topic_name'] = '';
            } else {
               setAlertOpen(true);
               setSuccess(false);
            }
         })
         .catch((error) => console.log(error));
   };

   const getTopicData = async () => {
      const header = {
         'headers': {
            "x-access-token": user.token
         }
      };
      return axios
         .get('/topics', header)
         .then((res) => res.data);
   };

   useEffect(
      () => {
         getTopicData().then((data) => setTopicData(data));
      }, []
   );

   useEffect(
      () => {
         getTopicData().then((data) => setTopicData(data));
      }, [openDelDialog]
   );

   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   const handleCloseDialog = (event) => {
      event.preventDefault()

      let dialogType = event.target.getAttribute("typ");
      if (event.target.value !== undefined
         && event.target.value === 'true'
         && dialogType === 'deleteTopic'
      ) {
         deleteTopic(topicToDel).then((data) => console.log(data))
      }
      setOpenDelDialog(false);
   };

   const deleteTopic = async (id) => {
      const formData = new FormData();
      formData.append('id', id);

      return axios
            .post('/topics/delete', formData)
            .then((res) => {
               return {
                  message: res.data,
                  status: res.status
               }
            });
   };
   return (
      <>
         <Grid container spacing={2} component="form" onSubmit={(event) => { handleSubmit(event) }}>
            <Grid item xs={10}>
               <TextField
                  id="topic_name"
                  color="info"
                  label="Topic name"
                  fullWidth
                  multiline
                  required
               />
            </Grid>
            <Grid item xs={2}>
               <FormControl fullWidth>
                  <InputLabel id="level-label" color="info">Level</InputLabel>
                  <Select
                     labelId="level-label"
                     id="level"
                     value={level}
                     color="info"
                     label="Level"
                     onChange={handleLevelChange}
                  >
                     <MenuItem value={1}>Easy</MenuItem>
                     <MenuItem value={2}>Medium</MenuItem>
                     <MenuItem value={3}>Hard</MenuItem>
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <TextField
                  id="description"
                  color="info"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  required
               />
            </Grid>
            <Grid item>
               <Box>
                  <Button
                     variant="contained"
                     component="label"
                  >
                     Upload Thumbnail
                     <input
                        id="thumbnail"
                        name="thumbnail"
                        accept="image/*"
                        type="file"
                        hidden
                        required
                        onChange={handleFileChange}
                     />
                  </Button>
                  <FormHelperText>{helperText}</FormHelperText>
               </Box>
            </Grid>
            <Grid item>
               <Button type="submit" variant="contained" color="success">
                  Create Topic
               </Button>
            </Grid>
            <Grid item xs={12}>
               <ResultAlert success={success} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
            </Grid>
         </Grid>
         <TableContainer sx={{ width: '100%' }} component={Paper}>
            <Table>
               <TableHead>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Number of Posts</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Delete</TableCell>
               </TableHead>
               <TableBody>
                  {(rowsPerPage > 0
                     ? topicData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                     : topicData
                  ).map((value, index) => (
                     <TableRow>
                        <TableCell>{value.id}</TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell align="center">{value.num_posts}</TableCell>
                        <TableCell>{levelLabel[value.level - 1]}</TableCell>
                        <TableCell>
                        {
                           <IconButton onClick={() => {
                              setOpenDelDialog(true);
                              setTopicToDel(value.id);
                              setMessage(deleteMessage);
                           }}>
                              <DeleteIcon />
                           </IconButton>    
                        }
                        </TableCell>
                     </TableRow>
                  ))
                  }
               </TableBody>
            </Table>
         </TableContainer>
         <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 15]}
            count={topicData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
         <VerifyDialog message={message} open={openDelDialog} handleClose={handleCloseDialog} />
      </>
   );

};
export default CreateTopic;