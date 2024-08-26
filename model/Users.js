import { Database as DB } from "../config/index.js";
import { createToken } from "../middleware/Authentication.js";
import { hash, compare } from "bcrypt";

class Users {
  fetchUsers(req, res) {
    const myQry = `
        SELECT * FROM users
        `;

    DB.query(myQry, (err, results) => {
      try {
        if (err) throw new Error(err);
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

   fetchUser(req,res){
    try{
        const myQry =`
        SELECT id, username, email FROM users WHERE id = ${req.params.id};
        `
        DB.query(myQry, (err, result)=>{
            if(err) throw new Error('error')
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
        })
    }
    catch(e){
        res.json({
            status: 404,
            msg: e.message
        })
    }
    }
      // Register A User
      async registerUser(req, res){
        try{
            let data = req.body
            data.password = await hash(data.password, 12)
            // payload
            let user = {
                emailAdd: data.emailAdd,
                password: data.password
            }
            let regQry = `
            INSERT INTO Users SET ?;
            `
            DB.query(regQry, [data],(err)=>{
                if(err){
                    res.json({
                        status:res,statusCode,
                        msg:'This email already exists'
                    })
                }else{
                    const token = createToken(user)
                    res.json({
                        token,
                        msg:'you are registered'
                    })
                }
            })
        }catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
}

export{
    Users
}