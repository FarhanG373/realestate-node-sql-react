import React, { useState, useEffect } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {getProp} from '../Redux/PropertySlice'
import s from "./Pages.module.scss";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const BuyProperty = () => {
  const {loading, error} = useSelector((state) => state.property);
const dispatch = useDispatch()
  const [property, setProperty] = useState([]);


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
      <h2>Property list for Buy</h2>
      <table className={s.propertyTable}>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Price</th>
            <th>Type</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {property.filter((p) => p.propertyFor === "sell").map((p) => (
            <tr key={p.id}>
              <td>
                <img src={`/uploads/${p.propImage}`} alt={p.propertyName} />
              </td>
              <td>{p.propertyName}</td>
              <td>{p.propertyPrice}</td>
              <td>{p.propertyType}</td>
              <td>{p.propertyAddress}</td>
              <td>
                <Link to={`tel:${p.ownerPhone}`}>Buy</Link>
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

export default BuyProperty;
