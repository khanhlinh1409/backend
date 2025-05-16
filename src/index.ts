import express from "express";
import { readCsvFile, User } from "./readCsv";

const app = express();
const PORT = 10000;

// Middleware to parse JSON
app.use(express.json());

// Route example
app.get("/", async (req, res) => {
  try {
    const users: User[] = await readCsvFile();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/data", (req, res) => {
  const data = req.body;
  console.log("Received:", data);
  res.json({ message: "Data received!", data });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
