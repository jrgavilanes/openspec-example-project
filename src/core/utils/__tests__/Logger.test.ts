import { expect, test, spyOn, describe, beforeEach } from "bun:test";
import { Logger, LogLevel, LogCategory } from "../Logger";

describe("Logger", () => {
  let logSpy: any;
  let errorSpy: any;

  beforeEach(() => {
    logSpy = spyOn(console, "log").mockImplementation(() => {});
    errorSpy = spyOn(console, "error").mockImplementation(() => {});
  });

  test("should log INFO to console.log in JSON format", () => {
    Logger.info(LogCategory.SYSTEM, "TEST_EVENT", { message: "hello" });

    expect(logSpy).toHaveBeenCalled();
    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output.level).toBe(LogLevel.INFO);
    expect(output.event).toBe("TEST_EVENT");
    expect(output.message).toBe("hello");
    expect(output.timestamp).toBeDefined();
  });

  test("should log ERROR to console.error", () => {
    Logger.error(LogCategory.API, "API_FAILURE", { message: "failed" });

    expect(errorSpy).toHaveBeenCalled();
    const output = JSON.parse(errorSpy.mock.calls[0][0]);
    expect(output.level).toBe(LogLevel.ERROR);
  });

  test("should include stack trace in CRITICAL logs", () => {
    const error = new Error("boom");
    Logger.critical(LogCategory.SYSTEM, "CRASH", error);

    const rawOutput = errorSpy.mock.calls[1][0];
    const output = JSON.parse(rawOutput);
    expect(output.level).toBe(LogLevel.CRITICAL);
    expect(output.stack).toBeDefined();
  });
});
