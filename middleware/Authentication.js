import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const { sign, verify } = jwt

function createToken(user) {
    return sign(
        {
            email: user.email,
            userPass: user.userPass,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
}

function verifyToken(req, res, next) {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null

    if (token) {
        try {
            // Verify token
            verify(token, process.env.SECRET_KEY)
            next() // Token is valid, proceed to the next middleware or route handler
        } catch (err) {
            // Handle token verification errors
            res.status(401).json({
                status: 401,
                msg: 'Invalid token'
            })
        }
    } else {
        // No token provided
        res.status(401).json({
            status: 401,
            msg: 'Please login'
        })
    }
}

export {
    createToken,
    verifyToken
}
