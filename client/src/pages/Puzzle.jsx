import { useState, useEffect } from "react";
import { ChessPuzzle } from "@react-chess-tools/react-chess-puzzle";
import axios from "axios";
import { Container, Typography, Box, CircularProgress, Button } from "@mui/material";

const Puzzle = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomPuzzle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/puzzle/random`, {
        headers: { "Content-Type": "application/json" },
      });

      const puzzleData = response.data;
      console.log("Puzzle data:", puzzleData);

      // Extract moves from PGN
      const pgn = puzzleData.pgn;
      const moveRegex = /\d+\.\s+(\S+)\s+(\S+)/g;
      let match;
      const moves = [];

      while ((match = moveRegex.exec(pgn)) !== null) {
        if (match[1]) moves.push(match[1]);
        if (match[2]) moves.push(match[2]);
      }

      setPuzzle({
        fen: puzzleData.fen,
        moves: moves,
        makeFirstMove: false,
        title: puzzleData.title,
        pgn: puzzleData.pgn,
      });

      setError(null);
    } catch (err) {
      console.error("Error fetching puzzle:", err.message);
      setError("Failed to load puzzle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPuzzle();
  }, []);

  const handleRefresh = () => {
    fetchRandomPuzzle();
  };

  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Typography color="error">{error}</Typography>
          <Button variant="contained" onClick={handleRefresh}>
            Try Again
          </Button>
        </Box>
      ) : puzzle ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            {puzzle.title || "Chess Puzzle"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Solution: {puzzle.moves.join(" ")}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", maxWidth: "500px" }}>
            <ChessPuzzle.Root puzzle={puzzle}>
              <ChessPuzzle.Board />
            </ChessPuzzle.Root>
          </Box>

          <Button variant="outlined" onClick={handleRefresh}>
            New Puzzle
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};

export default Puzzle;
