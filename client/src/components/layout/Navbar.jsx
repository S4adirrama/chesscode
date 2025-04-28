import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ChessCode
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/"  sx={{ fontSize: '1.2rem' }}>
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/about"  sx={{ fontSize: '1.2rem' }}>
            About Game
          </Button>
          <Button color="inherit" component={RouterLink} to="/leaderboard" sx={{ fontSize: '1.2rem' }}>
            Leaderboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/puzzle" sx={{ fontSize: '1.2rem' }}>
            Daily Puzzle
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 