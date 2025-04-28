require("dotenv").config();
const fetch = require("node-fetch");
const OpenAI = require("openai");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const SALT_ROUNDS = 10; 

class Controller {
  async getLeaderboards(req, res) {
    try {
      const response = await fetch("https://api.chess.com/pub/leaderboards");
      const data = await response.json();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: "Error when fetching leaderboard", error: error.message });
    }
  }

  async getRandomPuzzle(req, res) {
    try {
      const response = await fetch("https://api.chess.com/pub/puzzle/random");
      const data = await response.json();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: "Error in fetching puzzles", error: error.message });
    }
  }

  async getPlayer(req, res) {
    const RequestData = req.body;

    try {
      const response = await fetch(`https://api.chess.com/pub/player/${RequestData.playerName}`);
      const data = await response.json();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: "Error in getting Player", error: error.message });
    }
  }

  async getStockfishAnalysis(req, res) {
    const requestData = req.body;
    console.log("Request data:", requestData);
  
    if (!requestData.fen) {
      return res.status(400).json({ message: "FEN is necessary" });
    }
  
    try {
      const fen = requestData.fen;
      let depth = requestData.depth || 15;
  
      
      const url = `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`;
      const response = await fetch(url);
      console.log(response);

  
      if (!response.ok) {
        throw new Error(`Stockfish API returned error: ${response.statusText}`);
      }
  
      const stockfishData = await response.json();
      console.log("Stockfish API raw response:", stockfishData);
  
      if (!stockfishData.success) {
        return res.status(400).json({
          message: "Stockfish API error",
          error: stockfishData.data || "Unknown error"
        });
      }
  
      return res.json({
        evaluation: stockfishData.evaluation,
        mate: stockfishData.mate,
        bestmove: stockfishData.bestmove,
        continuation: stockfishData.continuation,
      });
    } catch (error) {
      console.error("Error in Stockfish analysis:", error);
      return res.status(500).json({ message: "Error in position analysis", error: error.message });
    }
  }
  
  

  async chat(req, res) {
    
    // messages = requestData.messages;
    //https://api.chess.com/pub/player/{PlayerName}/stats
    //https://api.chess.com/pub/player/{PlayerName}/games
    
    // if (!messages || !Array.isArray(messages)) {
      //   return res.status(400).json({ message: "Invalid Input" });
      // }
      
    try {
      const {playerName, userMessage} = req.body;
      console.log(`playerName: ${playerName}`)
      console.log(`userMessage: ${JSON.stringify(userMessage)}`)

      const stats = await fetch(`https://api.chess.com/pub/player/${playerName}/stats`);
      const games = await fetch(`https://api.chess.com/pub/player/${playerName}/games`);

      const gamesData = await games.json();
      console.log(gamesData)
      console.log(JSON.stringify(gamesData))


      const extractedGame = gamesData.games.map(game => ({
        pgn: game.pgn || "No PGN",

      }));


      console.log(`stats: ${JSON.stringify(stats)}`)
      console.log(`extractedGame: ${JSON.stringify(extractedGame)}`)

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

      const gptResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a chess assistant, super-grandmaster, and chess coach. You are very polite and friendly. You can analyze chess positions, suggest moves, and provide explanations. You can also play chess with the user."
          },
          {
            role: "user",
            content: `HERE IS MY OPPONENT ${playerName}, HERE IS MY MESSAGE: ${userMessage.content}. HELP ME TO CRUSH HIM!, HERE IS HIS GAMES: ${JSON.stringify(extractedGame)}`
          }
        ],
        response_format: { type: "text" }
      });

      const outputText = gptResponse.choices[0].message.content;

      return res.json({ answer: outputText });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error in GPT", error: error.message });
    }
  }

  /* async register(req, res) {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exist" });
      }
  
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
      const newUser = new User({
        username,
        password: hashedPassword
      });
  
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '7d' });
  
      return res.status(201).json({ message: "Registration succesfully", token });
    }
    catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "ОError during registration", error: error.message });
    }
  } */
  

  /* async login(req, res) {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User is not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
  
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  
      return res.json({ message: "Access is given", token });
    }
    catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Error during login", error: error.message });
    }
  } */
  


}
module.exports = new Controller();
