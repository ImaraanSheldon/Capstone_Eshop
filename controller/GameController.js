import express from 'express';
import { games } from '../model/index.js';
import bodyParser from 'body-parser';
// import { verifyToken } from '../middleware/authenticateUser.js';

const gamesRouter = express.Router();
gamesRouter.use(bodyParser.json());

// Fetch all games
gamesRouter.get('/', (req, res) => {
    games.fetchGames(req, res);
});

// Fetch recent all games
gamesRouter.get('/recent', (req, res) => {
    games.recentGames(req, res);
});

// Fetch recent a single game
gamesRouter.get('/:id', (req, res) => {
    games.fetchSingleGame(req, res);
});

// Register a new product
gamesRouter.post('/register', (req, res) => {
    games.addGame(req, res);
});

// Update a product by ID
gamesRouter.patch('/:id', (req, res) => {  // Corrected the endpoint path
    games.updateGame(req, res);
});

// Delete a product by ID
gamesRouter.delete('/:id', (req, res) => {
    games.deleteGame(req, res);
});



export{
    gamesRouter
}