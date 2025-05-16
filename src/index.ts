import express from "express";
import { readCsvFile, Customer } from "./readCsv";

const app = express();
const PORT = 10000;

// Middleware to parse JSON
app.use(express.json());

// Route example
app.get("/customer/search", async (req, res) => {
  try {
    const { firstName, lastName, maritalStatus, noOfChildren } = req.query;

    let customers: Customer[] = await readCsvFile();

    // Lọc theo name
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

    res.json({ total: customers.length, customers });
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
      marriedcustomers,
      marriedCount: marriedcustomers.length,
      singlecustomers,
      singleCount: singlecustomers.length,
    });
    //res.status(200).json({ customers });
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
