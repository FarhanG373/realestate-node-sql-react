import React, { useState } from "react";
import s from "./Pages.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [fullName, setfullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [lookin, setLookin] = useState("");
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();

    const dat = await axios.post("http://localhost:9090/auth/register", {
      fullName,
      userName,
      email,
      password,
      phone,
      lookin,
    });
    if (dat.data.status === 200) {
      navigate("/login");
      setfullName("");
      setUserName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setLookin("");
    }
  };

  return (
    <div className={s.loginPage}>
      <div className={s.wrap}>
        <div className={s.formGroup}>
          <form onSubmit={addUser}>
            <h1>Sign Up</h1>
            <div className={s.row}>
              <label htmlFor="fname">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="Enter Full Name"
                onChange={(e) => setfullName(e.target.value)}
              />
            </div>
            <div className={s.row}>
              <label htmlFor="uname">User Name</label>
              <input
                type="text"
                className="form-control"
                id="uname"
                placeholder="Enter User Name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className={s.row}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={s.row}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={s.row}>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={s.row}>
              <label htmlFor="type">looking For</label>
              <select id="type" onChange={(e) => setLookin(e.target.value)}>
              <option>Select</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
                <option value="rent">rent</option>
              </select>
            </div>
            <div className={s.row}>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <p>
            Already have an account?<br></br>
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
