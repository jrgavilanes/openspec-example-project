import { ServerWebSocket } from "bun";
import { ZodError } from "zod";
import { AppError } from "./AppError";

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export function handleError(ws: ServerWebSocket<unknown>, error: unknown) {
  let response: ErrorResponse;

  if (error instanceof AppError) {
    response = {
      success: false,
      error: {
        code: error.errorCode,
        message: error.message,
        details: error.details,
      },
    };
  } else if (error instanceof ZodError) {
    response = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: error.errors,
      },
    };
  } else {
    console.error("Internal Server Error:", error);
    response = {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }

  ws.send(JSON.stringify(response));
}
