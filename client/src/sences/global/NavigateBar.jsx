import { Link, Typography, Box, Stack, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from "react-router-dom";

const NavigateBar = ({ pathInfor }) => {
   const navigate = useNavigate();
   const iter = Array.from(pathInfor).map((value, index) => (
      value[1] != ''
         ?
         <Typography underline="hover" href={value[1]} key={index} color='inherit'
            onClick={() => navigate(value[1])}
            sx={{
               '&:hover': {
                  cursor: 'pointer'
               }
            }}
         >
            {value[0]}
         </Typography>
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