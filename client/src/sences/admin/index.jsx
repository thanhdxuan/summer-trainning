import { useTheme, Container, Divider } from '@mui/material'
import { tokens } from '../../theme';
import NavigateBar from '../global/NavigateBar';
import { useParams } from 'react-router-dom';
import Topbar from '../global/TopBar';

const AdminPanel = () => {
   const theme = useTheme();
   const { q } = useParams();
   console.log(q);
   const colors = tokens(theme.palette.mode);

   return (
      <>
         <Topbar />
         <Divider flexItem />
      <Container maxWidth='lg'>
         <NavigateBar pathInfor={[['Home', '/'], ['Admin', '']]} />
      </Container>
      </>
   );
}

export default AdminPanel;