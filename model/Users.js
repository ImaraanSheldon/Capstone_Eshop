import { Database as DB } from '../config/index.js'
import { createToken } from '../middleware/authenticateUser.js'
import { hash, compare } from 'bcrypt'

class Users{
    fetchUsers(req,res){
        const myQry = 
        `
        SELECT * FROM users
        `

        DB.query(strQry, (err, results)=>{
            try{
                if(err) throw new Error(err)
                    res.json({
                        status: res.statusCode,
                        results      
                    })
            }catch(e){
                res.json({
                    status: 404,
                    msg: e.message
                })
            }
            
        })   
    }
    }
}