import {createPool} from "mysql2";
import "dotenv/config"
// import { error } from "console"

let Database = createPool({
    host:process.env.hostDatabase,
    user: process.env.userDatabase,
    password: process.env.userPass,
    database: process.env.databaseName,
    multipleStatements: true,
    connectionLimit: 30,
})
Database.on('connection',(pool)=>{
    if(!pool) throw new Error('Unable to Connect ^(--)^')
})
export{
    Database
}