import { con } from "../DB/DB.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registor = (req, res) => {
  const { fullName, userName, email, phone, lookin } = req.body;
  const pass = bcrypt.hashSync(req.body.password);
  const select = `SELECT * FROM user WHERE email=?`;
  const insert = `INSERT INTO user SET ?`;

  con.query(select, [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }

    if (result.length > 0) {
      res.status(400).json({ status: 400, message: "User already exists" });
    } else {
      con.query(
        insert,
        {
          fullName,
          userName,
          email,
          userRole: lookin,
          password: pass,
          phoneNumber: phone,
        },
        (err, result) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ status: 500, message: "Internal server error" });
            return;
          }

          res
            .status(200)
            .json({ status: 200, message: "User registered successfully" });
        }
      );
    }
  });
};

export const login = (req, res) => {
  const select = `SELECT * FROM user WHERE email=?`;
  con.query(select, [req.body.email], (err, results) => {
    if (err) {
        throw err;
      } else if (!results || results.length === 0) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }
      const match = bcrypt.compareSync(req.body.password, results[0].password);
      if (!match) {
        return res.status(401).json({ status: 401, message: "Invalid password" });
      }
      const token = jwt.sign({ id: results[0].id }, "secretkey", {
        expiresIn: "1h",
      });
      return res.json({
        status: 200,
        message: "Logged in successfully",
        token,
      });
  });
};

export const UserDetails = (req, res) => {
    const select = `SELECT * FROM user`;
    con.query(select, (err, result) => {
        if (err)  throw err; 
       return res.status(200).json({ status: 200, message:'Data fetch success', data : result });
       
    });
};
