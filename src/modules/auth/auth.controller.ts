import { Request, Response } from "express";
import { authService } from "./auth.service";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { token, user, rememberMe } = await authService.registerUser(req.body);

    
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: rememberMe
        ? 30 * 24 * 60 * 60 * 1000 // 30 days
        : 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { token, user, rememberMe } = await authService.loginUser(req.body);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: rememberMe
        ? 30 * 24 * 60 * 60 * 1000 // 30 days
        : 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Login success",
      user,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthenticated",
      });
    }
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;
    return res.status(200).json({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    });
  } catch (error: any) { return res.status(401).json({ message: "Invalid or expired token" }); }
};

export const authController = {
  registerUser,
  loginUser,
  getMe
};
