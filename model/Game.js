import { Database as DB } from "../config/index.js";

class Games {
  // all Games
  fetchGames(req, res) {
    const strQry = `
        SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
        FROM games;
        `;
    DB.query(strQry, (err, results) => {
      try {
        if (err) throw new Error("Unable to fetch products");
        res.json({
          status: res.statusCode,
          results,
        });
      } catch (e) {
        res.json({
          status: 404,
          msg: e.message,
        });
      }
    });
  }

  // recent games
  recentGames(req, res) {
    try {
      const strQry = `
        SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
        FROM games ORDER BY release_date DESC LIMIT 12;
        `;
      DB.query(strQry, (err, results) => {
        if (err) throw new Error(err);
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }
  // Discounts
  fetchDiscounts(req, res) {
    try {
      const strQry = `
        SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
        FROM games WHERE price < 40;
        `;
      DB.query(strQry, (err, results) => {
        if (err) throw new Error(err);
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }
  // Discounts
  fetchCharts(req, res) {
    try {
      const strQry = `
        SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
        FROM games ORDER BY amount_sold DESC;
        `;
      DB.query(strQry, (err, results) => {
        if (err) throw new Error(err);
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }

// Fetch a single product by ID
fetchSingleGame(req, res) {
  const gameId = req.params.id;

  // Ensure the ID is a valid integer to avoid SQL injection
  if (isNaN(gameId)) {
    return res.status(400).json({
      status: 400,
      msg: 'Invalid game ID format',
    });
  }

  const strQry = `
        SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
        FROM games
        WHERE id = ?;
        `;

  DB.query(strQry, [gameId], (err, result) => {
    if (err) {
      console.error(err);  // Log the error for server-side diagnostics
      return res.status(500).json({
        status: 500,
        msg: 'An error occurred while fetching the game',
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        status: 404,
        msg: 'Game not found',
      });
    }

    res.status(200).json({
      status: 200,
      result: result[0],
    });
  });
}

  // Add a new product
  addGame(req, res) {
    try {
      let data = req.body;
      const regQry = `
                INSERT INTO games SET ?;
                `;
      DB.query(regQry, [data], (err) => {
        if (err) {
          console.log(data);
          res.json({
            status: res.statusCode,
            msg: err.message,
          });
        } else {
          res.json({
            msg: "Product added successfully",
          });
        }
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }

  // Update a product by ID
  updateGame(req, res) {
    try {
      let data = req.body;
      const strQry = `UPDATE games SET ? WHERE id = ${req.params.id}`;
      DB.query(strQry, [data], (err) => {
        console.log(err);
        
        if (err) throw new Error("Failed to update product");
        res.json({
          status: res.statusCode,
          msg: "Product updated successfully",
        });
      });
    } catch (e) {
      res.json({
        status: 400,
        msg: e.message,
      });
    }
  }
  // Delete a product by ID
  deleteGame(req, res) {
    try {
      const strQry = `
            DELETE FROM games WHERE id = ${req.params.id};
            `;
      DB.query(strQry, (err) => {
        if (err) throw new Error("Failed to delete product");
        res.json({
          status: res.statusCode,
          msg: "Game deleted successfully",
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }

  // Published by Nintendo
  fetchPublished(req, res) {
    const strQry = `
                SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
                FROM games 
                WHERE publisher = 'Nintendo'
                ORDER BY release_date DESC LIMIT 4;

                `;
    try {
      DB.query(strQry, (err, results) => {
        if (err) throw new Error("Can't find games published by Nintendo");
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }
  // Developed by Nintendo
  fetchDeveloped(req, res) {
    const strQry = `
                SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
                FROM games 
                WHERE developer = 'Nintendo';
                `;
    try {
      DB.query(strQry, (err, results) => {
        console.log(err);
        
        if (err) throw new Error("Can't find games developed by Nintendo");
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }

  searchGames(req, res) {
    // Extract search parameters from the query string
    const { searchTerm, genre, minPrice, maxPrice } = req.query;

    // Base query
    let strQry =
      "SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold FROM games WHERE 1=1";

    // Array to hold query parameters
    let queryParams = [];

    // Add search term condition if provided
    if (searchTerm) {
      strQry += " AND title LIKE ?";
      queryParams.push(`%${searchTerm}%`);
    }

    // Add genre condition if provided
    if (genre) {
      strQry += " AND genre = ?";
      queryParams.push(genre);
    }

    // Add price range condition if provided
    if (minPrice) {
      strQry += " AND price >= ?";
      queryParams.push(minPrice);
    }
    if (maxPrice) {
      strQry += " AND price <= ?";
      queryParams.push(maxPrice);
    }

    // Execute the query
    DB.query(strQry, queryParams, (err, results) => {
      try {
        if (err) throw new Error("Unable to fetch games");
        res.json({
          status: res.statusCode,
          results,
        });
      } catch (e) {
        res.json({
          status: 404,
          msg: e.message,
        });
      }
    });
  }
}

export { Games };
