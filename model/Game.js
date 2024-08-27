import { Database as DB } from '../config/index.js';

class Games{
    // all Games
    fetchGames(req, res) {
        const strQry = `
        SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
        FROM games;
        `;
        DB.query(strQry, (err, results) => {
            try {
                if (err) throw new Error('Unable to fetch products');
                res.json({
                    status: res.statusCode,
                    results      
                });
            } catch (e) {
                res.json({
                    status: 404,
                    msg: e.message
                });
            }
        });
    }

    // recent games
    recentGames(req,res){
        try{
            const strQry = `
        SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
        FROM games ORDER BY id DESC LIMIT 12;
        `
        DB.query(strQry,(err, results)=>{
            if(err)throw new Error(err)
            res.json({
                status: res.statusCode,
                results      
            });
        })
        }catch(e){
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }

       // Fetch a single product by ID
       fetchSingleGame(req, res) {
        try {
            const strQry = `
            SELECT id, title, description, genre, release_date, price, developer, publisher, platform, cover_image, gameplay_imageOne, gameplay_imageTwo, rating, stock_quantity, amount_sold 
            FROM games
            WHERE id = ${req.params.id};
            `;
            DB.query(strQry, (err, result) => {
                if (err) throw new Error('Error fetching Game');
                res.json({
                    status: res.statusCode,
                    result: result[0]
                });
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
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
                        console.log(data)
                        res.json({
                            status: res.statusCode,
                            msg: err.message
                        });
                    } else {
                        res.json({
                            msg: 'Product added successfully'
                        });
                    }
                });
            } catch (e) {
                res.json({
                    status: 404,
                    msg: e.message
                });
            }
        }

            // Update a product by ID
    updateGame(req, res) {
        try {
            let data = req.body;
            const strQry = `UPDATE game SET ? WHERE id = ${req.params.id}`;
            DB.query(strQry, [data], (err) => {
                if (err) throw new Error('Failed to update product');
                res.json({
                    status: res.statusCode,
                    msg: 'Product updated successfully'
                });
            });
        } catch (e) {
            res.json({
                status: 400,
                msg: e.message
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
                if (err) throw new Error('Failed to delete product');
                res.json({
                    status: res.statusCode,
                    msg: 'Game deleted successfully'
                });
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }


}

export{
    Games
}