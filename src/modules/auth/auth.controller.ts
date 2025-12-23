import { Request, Response } from "express"
import { authService } from "./auth.service";

const registerUser = async (req: Request, res:Response) => {


    try {
        const result = await authService.registerUser(req.body);
        res.status(200).json({
            "success": true,
            "message": "User registered successfully",
            "data": result
        })
        
    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": error.message
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { token, user, rememberMe } = await authService.loginUser(req.body);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,        
      sameSite: "strict",
      maxAge: rememberMe
        ? 30 * 24 * 60 * 60 * 1000 // 30 days
        : 24 * 60 * 60 * 1000,     // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Login success",
      user
    });

  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
};


export const authController = {
    registerUser,
    loginUser
}