import { Stack, Typography, Box, Container, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import Post from './components/post';

const PostsPage = ({ TopicName }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
      <Container maxWidth='lg'>
         {/* Header */}
         <Box sx={{ mb: 2 }}>
            <Typography variant='h6' fontWeight="bold" >
               Home / Chemistry
            </Typography>
         </Box>
         <Box sx={{ mt: 4, mb: 2 }} fontWeight="bold" fontSize={{ sx: 12, md: 18 }}>
            Posts
         </Box>
         <Stack spacing={3}>
            <Post title="What is Lorem Ipsum?"/>
         </Stack>
      </Container>
   );
}

export default PostsPage;