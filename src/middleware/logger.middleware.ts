import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { promises } from "fs";
import path from "path";
import { formatDate } from "@/utils/formatDateTime";
import { generateRandomAlphaNumericCode } from "@/utils";

/**
 * Logs events to a specified log file with a timestamp and a random code.
 *
 * @param {string} message - The message to log.
 * @param {string} logName - The name of the log file.
 */
export const logEvents = async (message: string, logName: string) => {
  const dateTime = formatDate({
    date: new Date(),
    options: {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "numeric",
    },
  });
  const logItem = `${dateTime}\t${generateRandomAlphaNumericCode({
    codeLength: 15,
  })}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await promises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await promises.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\torigin-${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};
