// Authentication
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const {sign, verify} = jwt

function createToken(user){
    return sign({
        email: user.email,
        userPass: user.userPass,
    },
    process.env.secret_key,
    {
        expiresIn: '1h'
    }
)
}
function verifyToken(req,res,next){
    const token = req?.headers["authorization"]
    if(token){
        if(
            verify(token, process.env.secret_key)){
                next()
            }else{
                res?.json({
                    status:res.statusCode,
                    msg: 'Give correct infomation'
                })
            }
    }else{
    res?.json({
        status: res.statusCode,
        msg: 'please login'
    })
}
}
export{
    createToken,
    verifyToken
}