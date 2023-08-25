import {
   Box,
   FormControl,
   InputLabel,
   Select,
   Chip,
   MenuItem,
   OutlinedInput,
   TableContainer,
   Table,
   TableHead,
   TableCell,
   TableBody,
   TableRow,
   Button,
   IconButton,
   Collapse,
   TextField,
   FormHelperText,
   Grid,
   FormGroup,
   FormLabel,
   TablePagination
} from "@mui/material";

import 'react-quill/dist/quill.snow.css';

import VerifyDialog from "../components/VerifyDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axios from "axios";
import ResultAlert from "../components/ResultAlert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

const CreateQuestionForm = ({ postId, reRenderData }) => {
   const [alertOpen, setAlertOpen] = useState(false);
   const [success, setSuccess] = useState(false);




   const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('post_id', postId);
      formData.append('content', event.target['content'].value);
      formData.append('op_a', event.target['op_a'].value);
      formData.append('op_b', event.target['op_b'].value);
      formData.append('op_c', event.target['op_c'].value);
      formData.append('op_d', event.target['op_d'].value);
      formData.append('answer', parseInt(event.target['answer'].value));
      console.log(formData.get('answer'));
      axios
         .post('/questions/add', formData, {
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
      let form = document.getElementById("create-form");
      form.reset();
      reRenderData(postId);
   };
   return (
      <>
         <Grid container spacing={2} id="create-form" component="form" onSubmit={(event) => handleSubmit(event)}>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="content"
                     color="info"
                     label="Question"
                     fullWidth
                     multiline
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="op_a"
                     color="info"
                     label="Options 1"
                     fullWidth
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="op_b"
                     color="info"
                     label="Options 2"
                     fullWidth
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="op_c"
                     color="info"
                     label="Options 3"
                     fullWidth
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="op_d"
                     color="info"
                     label="Options 4"
                     fullWidth
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="answer"
                     color="info"
                     label="Answer (1 - 4)"
                     fullWidth
                     multiline
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <Button
                  variant="contained"
                  color="success"
                  type="submit"
               >
                  Submit
               </Button>
            </Grid>
         </Grid>
         <ResultAlert success={success} type={"question"} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
      </>
   );
};



const CreateQuestions = ({ getTopicData, getPostData, getQuestionData }) => {
   const [topicData, setTopicData] = useState([]);
   const [postData, setPostData] = useState([]);
   const [questionData, setQuestionData] = useState([]);
   const [selectedTopic, setSelectedTopic] = useState({

      name: "",
      id: 0
   });

   const [selectedPost, setSelectedPost] = useState({
      name: "",
      id: 0
   });

   const [openCreateForm, setOpenCreateForm] = useState(false);

   const [message, setMessage] = useState("");
   const [Q2Del, setQ2Del] = useState(0);
   const [openDelDialog, setOpenDelDialog] = useState(false);
   useEffect(
      () => {
         getTopicData().then((data) => setTopicData(data));
      }, []
   );

   const handleChange = (event) => {
      const {
         target: { value, name },
      } = event;
      console.log(value, name);
      if (name === 'topic') {
         setSelectedTopic(
            value
         );
         setOpenCreateForm(false);
         getPostData(value.id).then((data) => setPostData(data.posts));
         if (selectedPost.id !== 0) {
            setSelectedPost({
               name: "",
               id: 0
            });

         }
      } else if (name === 'post') {
         setSelectedPost(value);
         getQuestionData(value.id).then((data) => setQuestionData(data));
         setOpenCreateForm(false);
         if (page !== 0) {
            setPage(0);
         }
      }
   };
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const renderData = async (postId) => {
      getQuestionData(postId).then((data) => setQuestionData(data));
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
         && dialogType === 'deleteQuestion'
      ) {
         deleteQuestion(Q2Del)
            .then((data) => console.log(data))
            .then(() => {
               renderData(selectedPost.id);
         });
      }
      setOpenDelDialog(false);
   };

   const deleteQuestion = async (id) => {
      const formData = new FormData();
      formData.append('id', id);

      return axios
         .post('/questions/delete', formData)
         .then((res) => {
            return {
               message: res.data,
               status: res.status
            }
         });
   };

   return (
      <Grid container flexDirection="column">
         <Grid item xs={12}>
            <FormLabel>Select the topic</FormLabel>
            <FormControl sx={{ m: 1 }} color="info" fullWidth>
               <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
               <Select
                  labelId="demo-multiple-chip-label"
                  name='topic'
                  id="demo-multiple-chip"
                  value={selectedTopic.name}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Selec" />}
                  renderValue={(selected) => {
                     return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                           {
                              <Chip key={selected} label={selected} />
                           }
                        </Box>
                     );
                  }}
                  MenuProps={MenuProps}
                  color="info"
               >
                  {topicData.map((value, index) => (
                     <MenuItem
                        key={index}
                        value={{ name: value.name, id: value.id }}
                     >
                        {value.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Grid>
         <Grid item xs={12}>
            <FormLabel>Select the post</FormLabel>
            <FormControl color="info" sx={{ m: 1 }} fullWidth>
               <InputLabel id="post">Select</InputLabel>
               <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name="post"
                  value={selectedPost.name}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Selec" />}
                  renderValue={(selected) => {
                     return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                           {
                              <Chip key={selected} label={selected} />
                           }
                        </Box>
                     );
                  }}
                  disabled={selectedTopic.id === 0}
                  MenuProps={MenuProps}
                  color="info"
               >
                  {postData.map((value, index) => (
                     <MenuItem
                        key={index}
                        value={{ name: value.title, id: value._id }}
                     >
                        {value.title}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Grid>
         <Grid item>
            <TableContainer>
               <Table>
                  <TableHead>
                     <TableCell>ID</TableCell>
                     <TableCell>Title</TableCell>
                     <TableCell align="center">Options</TableCell>
                     <TableCell>Answer</TableCell>
                     <TableCell>Delete</TableCell>
                  </TableHead>
                  <TableBody>
                     {(rowsPerPage > 0
                        ? questionData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : questionData).map((value, index) => (
                           <TableRow>
                              <TableCell>{value._id}</TableCell>
                              <TableCell>{value.content}</TableCell>
                              <TableCell align="center">
                                 {
                                    `
                                          A. ${value.op_a}, \n
                                          B. ${value.op_b}, \n
                                          C. ${value.op_c}, \n
                                          D. ${value.op_d}
                                       `
                                 }
                              </TableCell>
                              <TableCell>
                                 {
                                    value.answer
                                 }
                              </TableCell>
                              <TableCell>
                                 {
                                    <IconButton value={value} onClick={() => {
                                       setQ2Del(value._id);
                                       setMessage({
                                          type: "deleteQuestion",
                                          message: `Do you want to delete this question (id = ${value._id})?`,
                                       });
                                       setOpenDelDialog(true);
                                    }}>
                                       <DeleteIcon />
                                    </IconButton>
                                 }
                              </TableCell>
                           </TableRow>
                        )
                        )
                     }
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               component="div"
               rowsPerPageOptions={[5, 10, 15]}
               count={questionData.length}
               page={page}
               onPageChange={handleChangePage}
               rowsPerPage={rowsPerPage}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <VerifyDialog message={message} open={openDelDialog} handleClose={handleCloseDialog} />
         </Grid>
         <Grid item>
            <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
               <Button variant="outlined" color="success" disabled={selectedTopic.name === "" || openCreateForm || selectedPost.name === ""}
                  onClick={() => setOpenCreateForm(openCreateForm ? false : true)}
               >Create New Question</Button>
            </Box>
         </Grid>
         <Grid item>
            <Collapse in={openCreateForm}>
               <CreateQuestionForm postId={selectedPost.id} reRenderData={renderData} />
            </Collapse>
         </Grid>
      </Grid>
   );
};
export default CreateQuestions;