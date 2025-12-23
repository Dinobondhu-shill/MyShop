import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.join(process.cwd(), ".env") })

const config = {
    port : process.env.PORT,
    pg_host : process.env.PG_HOST,
    pg_port : process.env.PG_PORT,
    pg_user : process.env.PG_USER,
    pg_password : process.env.PG_PASSWORD,
    pg_database : process.env.PG_DATABASE,
    // connection_str : process.env.CONNECTION_STR,
    jwt_secret : process.env.JWT_SECRET
}

export default config;