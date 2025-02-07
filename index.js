import { userRouter } from "./controller/UsersController.js";
import { gamesRouter } from "./controller/GameController.js";
import path from 'path'
import express from 'express'
import bodyParser from "body-parser";


// Create an express app
const app = express();
const port = process.env.PORT || 4000;

// Routers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
  });

// Middleware
app.use(express.static('./static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/games', gamesRouter);


// Endpoint
app.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/Index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
