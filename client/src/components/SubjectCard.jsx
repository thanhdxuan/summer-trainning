import { Box, useTheme, Paper, Grid} from '@mui/material';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { tokens } from '../theme';

const SubjectCard = ({cardInfo}) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   return (
      <Box
         display="flex"
         backgroundColor={colors.grayAccent[300]}
         borderRadius={4}
         sx= {{
            '&:hover': {
               borderBottom: 2,
               borderBottomColor: colors.grayAccent[600],
               cursor: "pointer"
            }
         }}
      >
         <Box sx={{ mx: 1, my: 1 }} width = "20%">
            <img
               src="/images/animals_1.svg"
               style={{
                  borderRadius: 15,
                  display: 'block',
                  width: '100%',
              }}
               loading="lazy"
            />
         </Box>
         <Box sx={{ my: 2, ml: 2 }}>
            <Typography
               variant='h5'
               fontWeight="bold"
            >
               Chemistry: The Central Science
            </Typography>
         </Box>
      </Box>
   );
}

export default SubjectCard;