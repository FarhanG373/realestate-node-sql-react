import React, { useState, useEffect } from "react";
import s from "./Pages.module.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AddPropertyForSell from "./AddPropertyForSell";
import BuyProperty from "./BuyProperty";
import RentedProperty from "./RentedProperty";

const DashBoard = () => {
  const token = JSON.parse(localStorage.getItem("tokenRealEstate"));
  const [data, setData] = useState([]);

  const decode = jwtDecode(token);
  const da = async () => {
    try {
      const d = await axios.get(`http://localhost:9090/auth/userDetail`);
      const fetchedData = d.data.data;
      const filter = fetchedData.filter((fd) => fd.id === decode.id);
      if (d && fetchedData && filter) {
        setData(filter);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    da();
  }, []);

  return (
    <div className={s.wrap}>
      {data.map((i) => {
        return i.userRole === "rent" ? (
          <RentedProperty key={i} />
        ) : i.userRole === "buy" ? (
          <BuyProperty key={i} />
        ) : (
          <AddPropertyForSell key={i} />
        );
      })}
    </div>
  );
};

export default DashBoard;
