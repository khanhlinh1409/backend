import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.signUp(email, password);
  if (result.error)
    return res.status(400).json({ error: result.error.message });
  res.status(201).json(result.data);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  if (result.error)
    return res.status(400).json({ error: result.error.message });
  res.status(200).json(result.data);
};
