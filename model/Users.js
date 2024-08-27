import { Database as DB } from "../config/index.js";
import { createToken } from "../middleware/Authentication.js";
import { hash, compare } from "bcrypt";

class Users {
  fetchUsers(req, res) {
    const myQry = `
        SELECT username, userPass, email, full_name, account_status, userType, profile_picture, date_of_birth, gender FROM users
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

  fetchUser(req, res) {
    try {
      const myQry = `
        SELECT username, userPass, email, full_name, account_status, userType, profile_picture, date_of_birth, gender FROM users WHERE id = ${req.params.id};
        `;
      DB.query(myQry, (err, result) => {
        if (err) throw new Error("error");
        res.json({
          status: res.statusCode,
          result: result[0],
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }

  async registerUser(req, res) {
    try {
      let data = req.body;
      console.log(data);
      data.userPass = await hash(data.userPass, 12);
      // payload
      let user = {
        email: data.email,
        userPass: data.userPass,
      };
      let regQry = `
            INSERT INTO users SET ?;
            `;
      DB.query(regQry, [data], (err) => {
        if (err) {
          res.json({
            status: res.statusCode,
            msg: err.message,
          });
        } else {
          const token = createToken(user);
          res.json({
            token,
            msg: "you are registered",
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

  async updateUser(req, res) {
    try {
      let data = req.body;
      if (data.userPass) {
        data.userPass = await hash(data.userPass, 12);
      }
      const strQry = `UPDATE users SET ? WHERE id = ${req.params.id}`;
      DB.query(strQry, [data], (err) => {
        if (err) throw new Error(err);
        res.json({
          status: res.statusCode,
          msg: "User Updated",
        });
      });
    } catch (e) {
      res.json({
        status: 400,
        msg: e.message,
      });
    }
  }

      // Delete
      deleteUser(req,res){
        try{
            const strQry = `
            DELETE FROM users WHERE id = ${req.params.id}
            `
    
            DB.query(strQry, (err)=>{
                if (err) throw new Error(error)
                res.json({
                status: res.statusCode,
                msg: 'A user\'s information was removed, permanently'
            })
            })
        }catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    // login
    async loginUser(req, res){
        try{
            const {email, userPass} = req.body
            const strQry = `
            SELECT username, userPass, email, full_name, account_status, userType, profile_picture, date_of_birth, gender FROM users WHERE email = '${email}'
            `
            DB.query(strQry, async (err, result)=>{
                if(err) throw new Error('ok')
                if(!result?.length){
                    res.json({
                        status: 401,
                        msg: "You provided a wrong email"
                    })
                }else{
                    const isValidPass = await compare(userPass, result[0].userPass)
                    if(isValidPass){
                        const token = createToken({
                            email,
                            userPass
                        })
                        res.json({
                            status:res.statusCode,
                            token,
                            result: result[0]
                        })
                    }else{
                        res.json({
                            status: 401,
                            msg: e.message
                        })
                    }
                }
            })
        }catch(e){
            res.json({
                status: 401,
                msg: 'invalid password or you have not registered'
            })
        }
    }
}

export { Users };
