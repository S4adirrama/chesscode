import { Typography, Box, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
// Adjust grid layout and spacing
const gridContainerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 1200,
  mx: 'auto',
  px: 2,
  mt: 4,
};

// Update piece card size
const updatedPieceCardStyles = {
  padding: 4,
  borderRadius: '20px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #ffffff, #f9f9f9)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
  },
};

// Update piece image size
const updatedPieceImageStyles = {
  width: 80,
  height: 80,
  marginBottom: 16,
};
// Import chess piece images
import KingIcon from '../assets/King.png';
import QueenIcon from '../assets/Queen.png';
import RookIcon from '../assets/Rook.png';
import BishopIcon from '../assets/Bishop.png';
import KnightIcon from '../assets/Knight.png';
import PawnIcon from '../assets/Pawn.png';

// Reusable styled components
const PieceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #ffffff, #f9f9f9)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
  },
}));

const PieceImage = styled('img')({
  width: 60,
  height: 60,
  marginBottom: 16,
});

const About = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      py: 8
    }}>
      <Box sx={{ 
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, md: 4 }
      }}>
        {/* Hero Section */}
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
            mb: 8,
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
            About Chess
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              opacity: 0.9,
              lineHeight: 1.6
            }}
          >
            Chess is an intellectual game between 2 minds, where strategy and tactics are key. It has a rich history and is played by millions around the world. Whether you're a beginner or a grandmaster, there's always something new to learn.
          </Typography>
        </Paper>

        {/* Game Rules Section */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            mb: 8
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Game Rules
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.15rem',
              lineHeight: 1.8,
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Chess is a two-player strategy game played on an 8×8 board where each player tries to checkmate the opponent's king, meaning the king is under threat and cannot escape. Each player starts with 16 pieces and takes turns making one move at a time, following a set of rules for winning and drawing. The game can end by checkmate, stalemate, resignation, a draw by agreement, threefold repetition, or the fifty-move rule. Special actions like castling, en passant, and pawn promotion exist to add strategic depth, but the ultimate goal remains protecting your own king while attacking your opponent’s.
          </Typography>
        </Paper>

        {/* Pieces Section */}
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: 6,
            color: 'primary.main'
          }}
        >
          Chess Pieces
        </Typography>

        <Grid container spacing={4}>
          {/* King */}
          <Grid item xs={12} sm={6} md={4}>
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
              <CardMedia
                component="img"
                image={KingIcon}
                alt="King"
                sx={{
                  height: 120,
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  King
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  The most important piece. Protect it at all costs. If it's checkmated, the game is over.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Queen */}
          <Grid item xs={12} sm={6} md={4}>
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
              <CardMedia
                component="img"
                image={QueenIcon}
                alt="Queen"
                sx={{
                  height: 120,
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  Queen
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  The most powerful piece, moving any number of squares in any direction.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Rook */}
          <Grid item xs={12} sm={6} md={4}>
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
              <CardMedia
                component="img"
                image={RookIcon}
                alt="Rook"
                sx={{
                  height: 120,
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  Rook
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  Moves horizontally or vertically across the board.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Bishop */}
          <Grid item xs={12} sm={6} md={4}>
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
              <CardMedia
                component="img"
                image={BishopIcon}
                alt="Bishop"
                sx={{
                  height: 120,
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  Bishop
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  Moves diagonally on the board with great range.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Knight */}
          <Grid item xs={12} sm={6} md={4}>
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
              <CardMedia
                component="img"
                image={KnightIcon}
                alt="Knight"
                sx={{
                  height: 120,
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  Knight
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  Moves in an "L" shape. The only piece that can jump over others.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pawn */}
          <Grid item xs={12} sm={6} md={4}>
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
              <CardMedia
                component="img"
                image={PawnIcon}
                alt="Pawn"
                sx={{
                  height: 120,
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  Pawn
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  Moves forward one square, with the option to capture diagonally.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
