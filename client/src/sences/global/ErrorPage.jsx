import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
   return (
      <Box sx={{ mt: 30 }} display="flex" flexDirection="column" alignItems="center">
         <Box display="flex" sx={{ px: 10, pt: 10}}>
            <img
               src='/images/general/empty-removebg.png'
               style={{
                  width: 200
               }}
               loading='lazy'
            />
         </Box>
         <Typography
            variant="h4"
            color="inherit"
            fontWeight='bold'
            sx={{ mt: 4 }}
         >
            Page Not Found!
         </Typography>
      </Box>
   );
}

export default ErrorPage;