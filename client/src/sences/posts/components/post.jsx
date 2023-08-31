import { useTheme, Box, Typography, Stack, Chip, Avatar, Divider, Button, Collapse } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { tokens } from '../../../theme';
import ListQuestions from './Questions';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import parse from "html-react-parser";

const Post = ({ postInfor, postData, setPostData, openHistory, setOpenHistory }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const HistoryTable = ({ rows }) => {
      return (
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align='center'>No.</TableCell>
                     <TableCell align="center">Score</TableCell>
                     <TableCell align="center">Status</TableCell>
                     <TableCell align="center">Taken At.</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row, index) => (
                     <TableRow
                        key={row['_id']}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell component="th" scope="row" align='center'>
                           {index}
                        </TableCell>
                        <TableCell align="center">{`${row['score']}/${postData['questions'].length}`}</TableCell>
                        <TableCell align="center">
                           {
                              row['score'] === postData['questions'].length ? (
                                 <Chip label='Passed' color='success' size='small'/>
                              ) : (
                                 <Chip label='Failed' color='error' size='small' />
                              )
                           }
                        </TableCell>
                        <TableCell align="center">{row['taken_time']}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      );
   };

   return (
      <Box width="100%" sx={{ px: 2, py: 2, bgcolor: colors.grayAccent[100], boxShadow: 2, borderRadius: 2 }}>
         {/* Banner */}
         <Box display="flex">
            {/* Thumbnail */}
            <img
               src={postInfor['banner']}
               style={{
                  width: 600,
                  height: 400,
                  borderRadius: 10
               }}
            />
            <Box display="flex" flexDirection="column" sx={{ mx: 2 }} justifyContent="space-between" >
               {/* Title */}
               <Box>
                  <Box fontWeight={900} fontSize={{ xs: 30, md: 40 }} >
                     {postInfor['title']}
                  </Box>
                  {/* Description */}
                  <Box fontWeight={50} fontSize={{ xs: 14, md: 18 }} >
                     {postInfor['description']}
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                     {
                        Array.from(['haha', 'temp']).map((value, index) => (
                           <Chip label={'#' + value} key={index} size="small" />
                        ))
                     }
                  </Stack>

               </Box>
               <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                     py: 2,
                     bgcolor: colors.whiteAccent[100],
                     borderRadius: 2
                  }}
               >
                  <Box sx={{ pl: 2 }}>
                     <Avatar
                        src='/images/logo/logo-removebg.png'
                        sx={{
                           border: 1,
                           borderColor: colors.whiteAccent[600]
                        }}
                     />
                  </Box>
                  <Box sx={{ pl: 2 }}>
                     <Box fontWeight="bold">
                        {postInfor['author']}
                     </Box>
                     <Box display="flex" gap={1} alignItems="center">
                        <Box> {postInfor['created_date']} </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box> {postInfor['read_time'] + ' mins read'} </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box> {postData['questions'].length + ' questions'} </Box>
                        <Chip
                           label={postData['status'] === false ? 'Not Completed' : 'Completed'}
                           color={postData['status'] === false ? 'warning' : 'success'}
                           size="small"
                        />
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Box>
         <Divider flexItem sx={{ my: 4 }} />
         {/* Contents */}
         <Box sx={{ mt: 2 }}>
            <Typography variant='h4'>
               {parse(postInfor['content'])}
            </Typography>
            <Box display="flex" gap={1} sx={{ my: 2 }}>
               <Box>
                  <Button
                     size="large"
                     variant='outlined'
                     color='secondary'
                     onClick={() => { openHistory ? setOpenHistory(false) : setOpenHistory(true) }}
                  >
                     View History
                     {!openHistory && <KeyboardArrowRight />}
                     {openHistory && <KeyboardArrowDownIcon />}
                  </Button>
               </Box>
               <Box>
                  <ListQuestions questions={postData['questions']} postId={postInfor['_id']} setPostData={setPostData} postData={postData} />
               </Box>
            </Box>
            <Collapse in={openHistory}>
               <HistoryTable rows={postData['history']} />
            </Collapse>
         </Box>
      </Box>
   );
}

export default Post;