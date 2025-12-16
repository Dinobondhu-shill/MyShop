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

export const authController = {
    registerUser
}