import { Box, useTheme, Paper, Grid} from '@mui/material';
import { tokens } from '../theme';

const SubjectCard = ({cardInfo}) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   return (
      <Grid>
         <Paper
          sx={{
            height: 140,
            width: 280,
            backgroundColor: colors.blackAccent[700]
         }} />
      </Grid>
   );
}

export default SubjectCard;