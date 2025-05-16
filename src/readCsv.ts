import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { parse } from "fast-csv";

export interface Customer {
  ID: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNo: string;
  maritalStatus: string;
  noOfChildren: string;
}

export const readCsvFile = (): Promise<Customer[]> => {
  return new Promise((resolve, reject) => {
    const results: Customer[] = [];
    const filePath = path.join(__dirname, "../customer_data.csv");

    fs.createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on("error", (error) => reject(error))
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results));
  });
};
