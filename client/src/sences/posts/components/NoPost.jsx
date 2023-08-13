import { Box, Typography } from "@mui/material";

const NoPost = ({ color }) => {
   return (
      <Box sx={{ my: 2 }} display="flex" flexDirection="column" alignItems="center">
         <Box display="flex" sx={{ px: 10, pt: 10}}>
            <img
               src='/images/general/empty-removebg.png'
               style={{
                  width: 200
               }}
            />
         </Box>
         <Typography
            variant="h4"
            color={color.blackAccent[800]}
            fontWeight='bold'
            sx={{ mt: 4 }}
         >
            This topic hasn't posts yet!
         </Typography>
      </Box>
   );
}

export default NoPost;