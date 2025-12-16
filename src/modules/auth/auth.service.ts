import { pool } from "../../config/db";


const registerUser = async(userData: any) => {

    console.log(userData);
const {first_name, last_name, email, phone, password, marketing_preference} = userData;

const result = await pool.query(`
INSERT INTO users (
  first_name,
  last_name,
  email,
  phone,
  password_hash,
  marketing_preference
)
VALUES (
  $1, $2, $3, $4, $5, $6
)
RETURNING
  id,
  first_name,
  last_name,
  email,
  phone,
  role,
  is_verified,
  created_at;
`, [first_name, last_name, email, phone, password, marketing_preference]);

return result.rows[0];

}



export const authService = {
    registerUser
}