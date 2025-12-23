import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const registerUser = async (userData: any) => {
  console.log("Auth Service - Register User");
  console.log(userData);
  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    marketing_preference,
  } = userData;

  const password_hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
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
`,
    [first_name, last_name, email, phone, password_hash, marketing_preference]
  );

  return result.rows[0];
};

const loginUser = async (loginData: any) => {
  console.log("Auth Service - Login User");
  console.log(loginData);
  const { email, password } = loginData;

  // validate email and password
  const isMatched = await pool.query(
    `
  SELECT * FROM users WHERE email = $1
  `,
    [email]
  );

  if (isMatched.rowCount === 0) {
    throw new Error("Invalid Email Address");
  }
  const user = isMatched.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid Password");
  }
  const expiresIn = loginData.rememberMe ? "30d" : "1d";

  const token = jwt.sign(
    { id: user?.id, name: user?.name, email: user?.email, role: user?.role },
    config.jwt_secret!,
    { expiresIn: expiresIn }
  );

  delete user.password_hash;
  return { token, user, rememberMe: loginData.rememberMe };
};

export const authService = {
  registerUser,
  loginUser,
};
