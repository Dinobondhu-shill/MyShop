import { Request, Response, NextFunction } from "express";
import * as z from "zod";

export const validate = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Combine all field messages into a single string for the top-level message
        const combinedMessage = error.issues
          .map((err) => ` ${err.message}`)
          .join("; ");

        return res.status(400).json({
          success: false,
          message: combinedMessage, // dynamic summary
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code,
          })),
        });
      }

      console.error("Unexpected error during body validation:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error during validation",
      });
    }
  };
};
