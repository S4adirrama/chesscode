import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
const Search = ({setPlayerName, playerName}) => { // playerName
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    if (!playerName) return;

    try {
      const payload = { 
        playerName: playerName
      };
      console.log("Payload for player:", payload);
      const response = await axios(`${import.meta.env.VITE_REACT_APP_API_URL}/api/player`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        data: payload
      });
      setPlayerData(response.data);
      setError('');
      setSearchHistory((prev) => [...new Set([playerName, ...prev])]);
    } catch (err) {
      setPlayerData(null);
      setError('Player not found or an error occurred.');
    }
  };

  const handleSelect = (name) => {
    setPlayerName(name);
    setPlayerData(null);
    setError('');
  };

  return (
    <Box sx={{ p: 2, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.paper'
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            borderRadius: 2,
            px: 3,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          Search
        </Button>
      </Box>

      {error && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: 'error.light',
            color: 'error.contrastText',
            borderRadius: 2
          }}
        >
          <Typography variant="body2">{error}</Typography>
        </Paper>
      )}

      {playerData && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              src={playerData.avatar || 'https://via.placeholder.com/150'}
              alt="avatar"
              sx={{ width: 64, height: 64, border: '2px solid', borderColor: 'primary.main' }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {playerData.name || playerData.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{playerData.username}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <InfoBlock label="Status" value={playerData.status} />
            <InfoBlock label="League" value={playerData.league || 'N/A'} />
            <InfoBlock label="Followers" value={playerData.followers.toLocaleString()} />
            <InfoBlock label="Country" value={playerData.country.split('/').pop()} />
            <InfoBlock label="Location" value={playerData.location || 'N/A'} />
            <InfoBlock label="Joined" value={new Date(playerData.joined * 1000).toLocaleDateString()} />
            <InfoBlock label="Last Online" value={new Date(playerData.last_online * 1000).toLocaleString()} />
          </Box>

          <Button
            href={playerData.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: 3,
              color: 'primary.main',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            View Profile →
          </Button>
        </Paper>
      )}

      {searchHistory.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            🔎 Search History
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={playerName}
              onChange={(e) => handleSelect(e.target.value)}
              displayEmpty
              sx={{
                borderRadius: 2,
                backgroundColor: 'background.paper'
              }}
            >
              <MenuItem value="" disabled>
                Select a player
              </MenuItem>
              {searchHistory.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      )}
    
    </Box>
  );
};

const InfoBlock = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {value}
    </Typography>
  </Box>
);

export default Search;
