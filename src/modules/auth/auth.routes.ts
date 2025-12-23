import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

router.post('/register', validate(registerSchema), authController.registerUser);
router.post('/login', validate(loginSchema), authController.loginUser)

export const authRoutes = router;