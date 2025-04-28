import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Button, ButtonGroup } from '@mui/material';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/leaderboards`, {
          headers: { "Content-Type": "application/json" },
        });

        const data = response.data;

        let allPlayers = [];
        for (const gameType in data) {
          if (Array.isArray(data[gameType])) {
            const playersWithGameType = data[gameType].map(player => ({
              ...player,
              gameType
            }));
            allPlayers = [...allPlayers, ...playersWithGameType];
          }
        }

        const sortedPlayers = allPlayers.sort((a, b) => b.score - a.score);

        setPlayers(sortedPlayers);
        setFilteredPlayers(sortedPlayers);
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error('Data retrieval error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const filterByGameType = (gameType) => {
    setActiveFilter(gameType);

    if (gameType === 'all') {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter(player => player.gameType === gameType);
      setFilteredPlayers(filtered);
    }
  };

  const getCountryCode = (countryUrl) => {
    if (!countryUrl) return '-';
    const parts = countryUrl.split('/');
    return parts[parts.length - 1].toUpperCase();
  };

  const gameTypeNames = {
    'daily': 'Daily Games',
    'rapid': 'Rapid',
    'blitz': 'Blitz',
    'bullet': 'Bullet',
    'bughouse': 'Bughouse',
    'chess960': 'Chess 960',
    '3check': '3-check',
    'kingofthehill': 'King of the Hill',
    'crazyhouse': 'Crazyhouse',
    'live_blitz': 'Live Blitz',
    'live_rapid': 'Live Rapid',
    'live_bullet': 'Live Bullet'
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Chess.com Rating Leaderboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <ButtonGroup variant="contained" aria-label="game type filter">
          {['all', 'live_blitz', 'live_rapid', 'live_bullet'].map((type) => (
            <Button 
              key={type}
              onClick={() => filterByGameType(type)}
              variant={activeFilter === type ? 'contained' : 'outlined'}
              sx={{ fontWeight: activeFilter === type ? 'bold' : 'normal' }}
            >
              {type === 'all' ? 'All' : gameTypeNames[type]}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 1200, 
          mx: 'auto', 
          mt: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          borderRadius: 2
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 2 }}>
            {error}
          </Typography>
        ) : filteredPlayers.length === 0 ? (
          <Typography sx={{ p: 4 }}>
            No players found for the selected game type.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Player</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Rating</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Game Type</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPlayers.map((player, index) => (
                  <TableRow 
                    key={`${player.player_id}-${player.gameType}`}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
                      cursor: 'pointer'
                    }}
                    onClick={() => window.open(player.url, '_blank')}
                  >
                    <TableCell sx={{ fontSize: '1rem' }}>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img 
                          src={player.avatar} 
                          alt={player.username}
                          style={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                            {player.username}
                          </Typography>
                          {player.name && (
                            <Typography variant="body2" color="text.secondary">
                              {player.name}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{player.title || '-'}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {player.score}
                    </TableCell>
                    <TableCell align="right">
                      {gameTypeNames[player.gameType] || player.gameType}
                    </TableCell>
                    <TableCell align="right">
                      {player.country ? getCountryCode(player.country) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Box sx={{ mt: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="body2" color="text.secondary">
          Data provided by Chess.com API. {activeFilter === 'all' ? 'Showing players from all categories' : `Filtered by ${gameTypeNames[activeFilter] || activeFilter}`}, sorted by rating.
        </Typography>
      </Box>
    </Box>
  );
};

export default Leaderboard;
