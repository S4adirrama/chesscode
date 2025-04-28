import { Typography, Box, Paper, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      py: 8
    }}>
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          mb: 8
        }}
      >
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
            color: '#fff',
            borderRadius: 4,
            p: { xs: 4, md: 8 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Master the Chess Prep
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              opacity: 0.9,
              lineHeight: 1.6
            }}
          >
            Search, analyze and prepare your future opponent in chess
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/game')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                backgroundColor: '#fff',
                color: '#1a237e',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start Playing
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/about')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderColor: '#fff',
                color: '#fff',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Features Section */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: 6,
            color: '#1a237e'
          }}
        >
          Why Choose ChessCode?
        </Typography>

        <Grid container spacing={4}>
          {/* Learn Chess Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: '#1a237e'
                  }}
                >
                  Learn Chess
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  Analyze games using StockFish chess engine and learn from your mistakes
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate('/about')}
                  sx={{
                    color: '#1a237e',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(26,35,126,0.1)'
                    }
                  }}
                >
                  How to play chess
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Play Online Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: '#1a237e'
                  }}
                >
                  Get AI-based recommendations on how to crush your opponent
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                Ask AI how to win you opponents, what opening to play and what strategy to use
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate('/game')}
                  sx={{
                    color: '#1a237e',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(26,35,126,0.1)'
                    }
                  }}
                >
                  Play Now →
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Track Progress Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: '#1a237e'
                  }}
                >
                  Search for opponents
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  Find your opponent on Chess.com and analyze their games
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate('/leaderboard')}
                  sx={{
                    color: '#1a237e',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(26,35,126,0.1)'
                    }
                  }}
                >
                  View Stats →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
