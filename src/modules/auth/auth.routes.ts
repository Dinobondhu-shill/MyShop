import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

router.post('/register', validate(registerSchema), authController.registerUser);
router.post('/login', validate(loginSchema), authController.loginUser);
router.get('/me', authController.getMe);
router.post('/logout', authController.logoutUser);

export const authRoutes = router;