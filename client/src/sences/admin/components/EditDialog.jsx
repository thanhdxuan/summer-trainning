import {
   Dialog,
   Box,
   Grid,
   Button,
   Paper,
   DialogContent,
   DialogActions,
   DialogTitle,
   TextField,
   FormControl,
   FormHelperText
} from '@mui/material';
import { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';



const UpdatePostForm = ({ open, setOpen, currentValue, reRenderPostData, topicId }) => {
   const handleClose = () => {
      setOpen(false);
   };
   const [title, setTitle] = useState(currentValue.title);
   const [readTime, setReadTime] = useState(currentValue.read_time);
   const [description, setDescription] = useState(currentValue.description);
   const [content, setContent] = useState(currentValue.content);
   const [helperText, setHelperText] = useState("");

   const handleTitleChange = (event) => {
      setTitle(event.target.value);
   };
   const handleTimeChange = (event) => {
      setReadTime(event.target.value);
      if (isNaN(event.target.value)) {
         setHelperText("Please number!");
      } else {
         setHelperText("");
      }
   };
   const handleDesChange = (event) => {
      setDescription(event.target.value);
   };
   const handleContentChange = (value) => {
      setContent(value);
   };

   const handleUpdatePost = (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('id', currentValue._id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('content', content);
      formData.append('read_time', readTime);

      axios
         .post('/posts/update', formData)
         .then((data) => console.log(data))
         .then(() => {
            reRenderPostData(topicId);
         })
      handleClose();
   };

   return currentValue !== undefined && (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
         <DialogTitle>Edit post</DialogTitle>
         <DialogContent>
            <Grid container spacing={2} sx={{ pt: 2 }}>
               <Grid item xs={12}>
                  <FormControl fullWidth>
                     <TextField
                        id="post_title"
                        color="info"
                        label="Post title"
                        fullWidth
                        multiline
                        required
                        value={title}
                        onChange={(event) => handleTitleChange(event)}
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
                        value={readTime}
                        onChange={handleTimeChange}
                     />
                     <FormHelperText error>{helperText}</FormHelperText>
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
                        value={description}
                        onChange={handleDesChange}
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12}>
                  <ReactQuill id="content" value={content} onChange={handleContentChange} style={{
                     width: 850
                  }} />
               </Grid>
            </Grid>
         </DialogContent>
         <DialogActions>
            <Box display="flex" justifyContent="flex-end" gap={2}>
               <Button color="error" onClick={(event) => handleClose()}>
                  Cancle
               </Button>
               <Button color="success" onClick={(event) => handleUpdatePost(event)}>
                  Update
               </Button>
            </Box>
         </DialogActions>
      </Dialog>
   );
};

export default UpdatePostForm;