import React, { useState } from "react";
import Chessboard from './Chessboard';
import Search from "./RightColumn/Search";
import Chat from "./Chat";
import { Box, Grid, Paper, Typography } from "@mui/material";

const Game = () => {
    const [messages, setMessages] = useState([]);
    const [playerName, setPlayerName] = useState();
    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0
        }}>
            <Box sx={{ 
                width: '98%', 
                height: '96%', 
                maxWidth: '1800px',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2
            }}>
                <Paper sx={{
                    flex: { xs: '1 1 100%', md: '0 0 25%' },
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: '30%', md: '100%' },
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        py: 1.5,
                        px: 2,
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                        color: '#fff'
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Chess Assistant
                        </Typography>
                    </Box>
                    <Box sx={{ 
                        flexGrow: 1, 
                        overflowY: 'auto',
                        height: 'calc(100% - 48px)'
                    }}>
                        <Chat messages={messages} setMessages={setMessages} playerName = {playerName} />
                    </Box>
                </Paper>

                <Paper sx={{
                    flex: { xs: '1 1 100%', md: '0 0 50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: '40%', md: '100%' },
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        py: 1.5,
                        px: 2,
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                        color: '#fff'
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Chess Game
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexGrow: 1,
                        p: 2,
                        height: 'calc(100% - 48px)'
                    }}>
                        <Chessboard />
                    </Box>
                </Paper>

                {/* Right Column - Search */}
                <Paper sx={{
                    flex: { xs: '1 1 100%', md: '0 0 25%' },
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: '30%', md: '100%' },
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        py: 1.5,
                        px: 2,
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                        color: '#fff'
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Player Search
                        </Typography>
                    </Box>
                    <Box sx={{ 
                        flexGrow: 1, 
                        overflowY: 'auto',
                        height: 'calc(100% - 48px)'
                    }}>
                        <Search setPlayerName={setPlayerName} playerName={playerName} />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Game;