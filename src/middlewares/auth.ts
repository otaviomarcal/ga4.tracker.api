import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado, token não fornecido" });
  }

  try {
    jwt.verify(token, process.env.JWT_KEY || "");
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Acesso negado, token inválido" });
  }
};
