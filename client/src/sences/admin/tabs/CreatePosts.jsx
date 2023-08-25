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
   FormLabel,
   Dialog
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axios from "axios";
import ResultAlert from "../components/ResultAlert";
import UpdatePostForm from "../components/EditDialog";
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




const CreatePostForm = ({ topicId, renderPostData }) => {
   const [helperText, setHelperText] = useState("Please upload the banner for this post.");
   const [selectedFiles, setSelectedFiles] = useState([]);
   const [alertOpen, setAlertOpen] = useState(false);

   const [success, setSuccess] = useState(false);

   const handleFileChange = (event) => {
      setSelectedFiles(event.target.files);
      setHelperText(`Uploaded file: ${event.target.value.split('\\').pop()}`)
   };
   const [content, setContent] = useState('');

   const handleContentChange = (value) => {
      setContent(value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      console.log("submit");
      const formData = new FormData();
      formData.append('topic_id', topicId);
      formData.append('read_time', event.target['post_read_time'].value);
      formData.append('title', event.target['post_title'].value);
      formData.append('content', content);
      formData.append('description', event.target['post_description'].value);
      formData.append('banner', event.target['banner'].value.split('\\').pop()); //get file name
      formData.append('file', selectedFiles[0]);
      axios
         .post('/posts/add', formData, {
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
   return (
      <>
         <Grid container spacing={2} component="form" onSubmit={(event) => handleSubmit(event)}>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="post_title"
                     color="info"
                     label="Post title"
                     fullWidth
                     multiline
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="post_read_time"
                     color="info"
                     label="Estimated Read Time"
                     fullWidth
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <FormControl fullWidth>
                  <TextField
                     id="post_description"
                     color="info"
                     label="Description"
                     fullWidth
                     multiline
                     minRows={3}
                     required
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <ReactQuill id="content" value={content} onChange={handleContentChange} />
            </Grid>
            <Grid item>
               <Box>
                  <Button
                     variant="contained"
                     component="label"
                  >
                     Upload Banner
                     <input
                        id="banner"
                        name="banner"
                        accept="image/*"
                        type="file"
                        hidden
                        required
                        onChange={handleFileChange}
                     />
                  </Button>
                  <FormHelperText error={selectedFiles.length === 0}>{helperText}</FormHelperText>
               </Box>
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
         <ResultAlert success={success} type={"post"} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
      </>
   );
};



const CreatePost = ({ getTopicData, getPostData }) => {
   const [topicData, setTopicData] = useState([]);
   const [postData, setPostData] = useState([]);

   const [openEditDialog, setOpenEditDialog] = useState(false);

   const [selectedTopic, setSelectedTopic] = useState({
      name: "",
      id: 0
   });
   const [openCreateForm, setOpenCreateForm] = useState(false);
   const [editingPost, setEditingPost] = useState(0);

   useEffect(
      () => {
         getTopicData().then((data) => setTopicData(data));
      }, []
   );

   // useEffect(
   //    () => {
   //       getPostData().then((data) => setPostData(data));
   //    }, [selectedTopic]
   // );
   const handleChange = (event) => {
      const {
         target: { value },
      } = event;
      console.log(value);
      setSelectedTopic(
         value
      );
      setOpenCreateForm(false);
      getPostData(value.id).then((data) => setPostData(data.posts));
   };

   const renderPostData = async (topicId) => {
      getPostData(topicId).then((data) => setPostData(data.posts));
   };

   return (
      <Grid container flexDirection="column">
         <Grid item xs={12}>
            <FormLabel>Select the topic</FormLabel>
            <FormControl sx={{ m: 1 }} color="info" fullWidth>
               <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
               <Select
                  labelId="demo-multiple-chip-label"
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
         <Grid item>
            <TableContainer>
               <Table>
                  <TableHead>
                     <TableCell>ID</TableCell>
                     <TableCell>Title</TableCell>
                     <TableCell align="center">Number of questions</TableCell>
                     <TableCell>Created Date</TableCell>
                     <TableCell>Delete</TableCell>
                     <TableCell>Edit</TableCell>
                  </TableHead>
                  <TableBody>
                     {
                        postData.map((value, index) => {
                           return (
                              <>
                                 <TableRow>
                                    <TableCell>{value._id}</TableCell>
                                    <TableCell>{value.title}</TableCell>
                                    <TableCell align="center">{value.number_of_questions}</TableCell>
                                    <TableCell>{value.created_date}</TableCell>
                                    <TableCell>
                                       {
                                          <IconButton>
                                             <DeleteIcon />
                                          </IconButton>
                                       }
                                    </TableCell>
                                    <TableCell>
                                       {<>
                                          <IconButton onClick={(event) => {
                                             event.preventDefault();
                                             setEditingPost(index);
                                             setOpenEditDialog(true);
                                          }}>
                                             <EditIcon />
                                          </IconButton>
                                       </>
                                       }
                                    </TableCell>
                                 </TableRow>
                              </>
                           );
                        })
                     }
                  </TableBody>
               </Table>
            </TableContainer>
         </Grid>
         <Grid item>
            <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
               <Button variant="outlined" color="success" disabled={selectedTopic.name === "" || openCreateForm}
                  onClick={() => setOpenCreateForm(openCreateForm ? false : true)}
               >Create New Post</Button>
            </Box>
         </Grid>
         <Grid item>
            <Collapse in={openCreateForm}>
               <CreatePostForm topicId={selectedTopic.id} />
            </Collapse>
         </Grid>
         {openEditDialog
            && <UpdatePostForm
               open={openEditDialog}
               setOpen={setOpenEditDialog}
               currentValue={postData[editingPost]}
               edittingPost={editingPost}
               reRenderPostData={renderPostData}
               topicId={selectedTopic.id}
            />
         }
      </Grid>
   );
};
export default CreatePost;