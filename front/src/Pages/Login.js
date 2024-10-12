import React, { useState } from "react";
import s from "./Pages.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const login = async (e) => {
    e.preventDefault();

    try {
      const dat = await axios.post(`http://localhost:9090/auth/login`, {
        email,
        password,
      });
      if (dat.data.status === 200) {
        localStorage.setItem("tokenRealEstate", JSON.stringify(dat.data.token));
        setEmail("");
        setPassword("");
        navigate("/dashboard");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setErr(error.response.data.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={s.loginPage}>
      <div className={s.wrap}>
        <div className={s.formGroup}>
          <form>
            <h1>Log in</h1>
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
              <button type="submit" className="btn btn-primary" onClick={login}>
                Login
              </button>
            </div>
            {err && <div className={s.error}>{err}</div>}
          </form>
          <p>
            Don't have an account?<br></br>
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
