import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { data, error } = await AuthService.signUp(email, password);
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(200).json(data);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { data, error } = await AuthService.login(email, password);
  if (error) {
    res.status(401).json({ error: error.message });
    return;
  }
  res.status(200).json(data);
};
