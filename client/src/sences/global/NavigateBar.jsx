import { Link, Typography, Box, Stack, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const NavigateBar = ({ pathInfor }) => {
   const iter = Array.from(pathInfor).map((value, index) => (
      value[1] != ''
         ?
         <Link underline="hover" href={value[1]} key={index} color='inherit'>
            {value[0]}
         </Link>
         :
         <Typography key={index} color="text.primary">
            {value[0]}
         </Typography>
   ));

   return (
      <Box sx={{ my: 2 }}>
         <Stack spacing={2}>
            <Breadcrumbs
               separator={<NavigateNextIcon fontSize="small" />}
               aria-label="breadcrumb"
            >
               {iter}
            </Breadcrumbs>
         </Stack>
      </Box>
   );

};

export default NavigateBar;