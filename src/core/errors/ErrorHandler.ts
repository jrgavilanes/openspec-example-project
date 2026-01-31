import { ServerWebSocket } from "bun";
import { ZodError } from "zod";
import { AppError } from "./AppError";
import { Logger, LogCategory } from "../utils/Logger";

interface ErrorResponse {
  type: "ERROR";
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export function handleError(ws: ServerWebSocket<{ socketId: string }>, error: unknown) {
  let response: ErrorResponse;
  const socketId = ws.data?.socketId;

  if (error instanceof AppError) {
    Logger.warn(LogCategory.API, "APP_ERROR", {
      socketId,
      message: error.message,
      metadata: { code: error.errorCode, details: error.details },
    });
    response = {
      type: "ERROR",
      success: false,
      error: {
        code: error.errorCode,
        message: error.message,
        details: error.details,
      },
    };
  } else if (error instanceof ZodError) {
    Logger.warn(LogCategory.API, "VALIDATION_ERROR", {
      socketId,
      metadata: { errors: error.errors },
    });
    response = {
      type: "ERROR",
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: error.errors,
      },
    };
  } else {
    Logger.critical(LogCategory.SYSTEM, "INTERNAL_SERVER_ERROR", error as Error, { socketId });
    response = {
      type: "ERROR",
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }

  ws.send(JSON.stringify(response));
}
