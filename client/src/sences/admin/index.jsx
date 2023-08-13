import { useTheme, Box, Container } from '@mui/material'
import { tokens } from '../../theme';
import NavigateBar from '../global/NavigateBar';
import { useParams } from 'react-router-dom';

const AdminPanel = () => {
   const theme = useTheme();
   const { q } = useParams();
   console.log(q);
   const colors = tokens(theme.palette.mode);

   return (
      <Container maxWidth='lg'>
         <NavigateBar pathInfor={[['Home', '/'], ['Admin', '']]} />
      </Container>
   );
}

export default AdminPanel;