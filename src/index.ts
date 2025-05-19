import express from "express";
import { readCsvFile, Customer } from "./readCsv";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://khanhlinh1409.github.io"],
  })
);
const PORT = 10000;

// Middleware to parse JSON
app.use(express.json());

// Route example
app.get("/customer/search", async (req, res) => {
  try {
    const { firstName, lastName, maritalStatus, noOfChildren } = req.query;

    let customers: Customer[] = await readCsvFile();

    // filters
    if (firstName) {
      customers = customers.filter((customer) =>
        customer.firstName
          .toLowerCase()
          .includes((firstName as string).toLowerCase())
      );
    }
    if (lastName) {
      customers = customers.filter((customer) =>
        customer.lastName
          .toLowerCase()
          .includes((lastName as string).toLowerCase())
      );
    }
    if (maritalStatus) {
      customers = customers.filter((customer) =>
        customer.maritalStatus
          .toLowerCase()
          .includes((maritalStatus as string).toLowerCase())
      );
    }

    if (noOfChildren) {
      customers = customers.filter((customer) =>
        customer.noOfChildren
          .toLowerCase()
          .includes((noOfChildren as string).toLowerCase())
      );
    }

    res.json({ count: customers.length, results: customers });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const customers: Customer[] = await readCsvFile();
    const marriedcustomers = customers.filter(
      (customer) => customer.maritalStatus === "Married"
    );
    const singlecustomers = customers.filter(
      (customer) => customer.maritalStatus === "Single"
    );

    res.json({
      count: customers.length,
      results: customers,
      marriedcount: marriedcustomers.length,
      marriedresults: marriedcustomers,
      singlecount: singlecustomers.length,
      singleresults: singlecustomers,
    });
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
