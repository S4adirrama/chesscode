import { Container, Box } from '@mui/material';
import Navbar from './Navbar';

const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    width: '100%'
  }
};

const Layout = ({ children }) => {
  return (
    <Box sx={styles.root}>
      <Navbar />
      <Box sx={styles.main}>
        {children}
      </Box>
    </Box>
  );
};


export default Layout;
