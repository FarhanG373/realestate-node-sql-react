import React, { useState, useEffect } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {getProp} from '../Redux/PropertySlice'
import s from "./Pages.module.scss";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const RentedProperty = () => {
  const {loading, error} = useSelector((state) => state.property);
  const dispatch = useDispatch()
  const [property, setProperty] = useState([]);
  const token = JSON.parse(localStorage.getItem("tokenRealEstate"));
  const decode = jwtDecode(token);

  useEffect(() => {
    dispatch(getProp(setProperty));
   }, [dispatch]);

   if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

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
          {property.filter((p) => p.propertyFor === "rent").map((p) => (
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
