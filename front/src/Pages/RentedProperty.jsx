import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./Pages.module.scss";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const RentedProperty = () => {
  const [property, setProperty] = useState([]);
  const token = JSON.parse(localStorage.getItem("tokenRealEstate"));
  const decode = jwtDecode(token);
  const getProp = async () => {
    const getP = await axios.get(`http://localhost:9090/property/getProperty`);
    setProperty(getP.data.data);
  };
  useEffect(() => {
    getProp();
  }, []);
  return (
    <>
      <h2>Property list for Rent</h2>
      <table className={s.propertyTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Type</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {property.map((p) => (
            <tr key={p.id}>
              <td>{p.propertyName}</td>
              <td>{p.propertyPrice}</td>
              <td>{p.propertyType}</td>
              <td>{p.propertyAddress}</td>
              <td>
                <Link to={`tel:${p.ownerPhone}`}>Ask for Rent</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/single/${p.id}`}>View detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RentedProperty;
