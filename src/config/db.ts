import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
 host: config.pg_host,
  port: config.pg_port ? parseInt(config.pg_port) : 5432,
  user: config.pg_user,
  password: config.pg_password,
  database:   config.pg_database,
})


const initDB = async () => {
    // USERS TABLE  
    await pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),

  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20) UNIQUE NOT NULL,

  password_hash VARCHAR(255) NOT NULL,

  role VARCHAR(20) NOT NULL DEFAULT 'customer'
    CHECK (role IN ('customer', 'vendor', 'admin')),

  marketing_preference BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  )
`);

    console.log("Database initialized");
}

export default initDB;