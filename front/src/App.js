import logo from "./logo.svg";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import DashBoard from "./Pages/DashBoard";
import Home from "./Pages/Home";
import SinglePage from "./Pages/SinglePage";

function App() {
  const getToken = JSON.parse(localStorage.getItem("tokenRealEstate"));
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={getToken ? <DashBoard /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={!getToken ? <Login /> : <DashBoard />}
        />
        <Route path="/single/:id" element={<SinglePage />} />
      </Routes>
    </div>
  );
}

export default App;
