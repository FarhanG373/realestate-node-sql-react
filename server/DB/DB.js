import mySql from "mysql";

export const con = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "realestate",
});
