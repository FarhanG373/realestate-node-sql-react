import React, { useState, useEffect } from "react";
import s from "./Pages.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {getProp} from '../Redux/PropertySlice'
const Home = () => {
  const {loading, error} = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const [rentProp, setremntProp] = useState([]);
  const [filter, setFilter] = useState("all");
  const handleFilterChange = (option) => {
    setFilter(option);
  };
  useEffect(() => {
    dispatch(getProp(setremntProp));
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }
  return (
    <div className={s.home}>
      <div className={s.banner}>
        <img
          src="https://images.pexels.com/photos/28731958/pexels-photo-28731958/free-photo-of-modern-high-rise-apartments-at-sunset-in-zhuhai.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className={s.wrap}>
        <h1 className={s.textCenter}>Welcome to Our Real Estate</h1>
        <p className={s.textCenter}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
          ipsum id arcu malesuada fermentum. In viverra, ligula ut finibus
          placerat, ligula velit gravida nunc, at semper neque ligula at nunc.
          Sed nec efficitur neque, id aliquet dui. Nullam vel velit non neque
          sollicitudin aliquet.
        </p>
        <p className={s.textCenter}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
          ipsum id arcu malesuada fermentum. In viverra, ligula ut finibus
          placerat, ligula velit gravida nunc, at semper neque ligula at nunc.
          Sed nec efficitur neque, id aliquet dui. Nullam vel velit non neque
          sollicitudin aliquet.
        </p>
      </div>
      <div className={s.wrap}>
        {rentProp.length > 0 && (
          <>
            <h1 className={s.textCenter}>Property</h1>
            <ul className={s.filter}>
              <li key={rentProp}>
                <button
                  onClick={() => handleFilterChange("all")}
                  className={filter === "all" ? s.active : ""}
                >
                  Show All
                </button>
              </li>
              <li key={rentProp}>
                <button
                  onClick={() => handleFilterChange("rent")}
                  className={filter === "rent" ? s.active : ""}
                >
                  Show For rent
                </button>
              </li>
              <li key={rentProp}>
                <button
                  onClick={() => handleFilterChange("sell")}
                  className={filter === "sell" ? s.active : ""}
                >
                  Show For Sell
                </button>
              </li>
            </ul>
            <div className={s.cardWrap}>
              {rentProp
                .filter((i) => filter === "all" || i.propertyFor === filter)
                .map((item) => (
                  <div key={item.propertyId} className={s.card}>
                    <img
                      src={`/uploads/${item.propImage}`}
                      alt={item.propertyName}
                    />
                    <h2>{item.propertyName}</h2>
                    <p>Price: ₹ {item.propertyPrice}</p>
                    <p>Address: {item.propertyAddress}</p>
                    <p>Type: {item.propertyType}</p>
                    <p>
                      {/* <Link to={`tel:${item.ownerPhone}`}>
                        {item.propertyFor === "rent"
                          ? "Ask for Rent"
                          : item.propertyFor === "sell"
                          ? "Ask for Quotation"
                          : ""}
                      </Link>
                      &nbsp;&nbsp;&nbsp;&nbsp; */}
                      <Link to={`/single/${item.id}`}>View detail</Link>
                    </p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
