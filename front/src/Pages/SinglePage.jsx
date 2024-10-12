import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import s from "./Pages.module.scss";
import axios from "axios";
const SinglePage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [con, setContact] = useState(false);
  const token = JSON.parse(localStorage.getItem('tokenRealEstate'));
  const getSingle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/property/singleProperty/${id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching single property:", error);
    }
  };

  const contact = () => {
    setContact(!con);
  };

  useEffect(() => {
    getSingle();
  }, []);
  return (
    <div className={s.wrap}>
      <div className={s.single}>
        <div className={s.det}>
        {data?.map((data, i) => {
          return (
            <div key={i}>
              <img
                src={`/uploads/${data.propImage}`}
                alt={data.propertyName}
                width={"100%"}
              />
              <h2>{data.propertyName}</h2>
              <p>{data.propertyDescription}</p>
              <p>
                <b>Price:</b> {data.propertyPrice}
              </p>
              <p>
                <b>Location:</b> {data.propertyAddress}
              </p>
              <p>
                <b>Type:</b> {data.propertyType}
              </p>
              <p>
                <b>Property For:</b> {data.propertyFor}
              </p>
            </div>
          );
        })}

        {token ? <button onClick={contact}>Contact with seller</button> : <Link to={`/login`}>Login for contact seller</Link>}
        </div>
        {con && (
          <div className={s.contactForm}>
            <h2>Connect with Seller</h2>
            <div className={s.row}>
              <input type="text" placeholder="your Name" />
            </div>
            <div className={s.row}>
              <input type="text" placeholder="Email" />
            </div>
            <div className={s.row}>
              <input type="text" placeholder="Phone" />
            </div>
            <div className={s.row}>
              <textarea placeholder="Message" />
            </div>
            <div className={s.row}>
              {
                data.map((d)=>{
                  return <input type="text" value={d.propertyName} disabled/>
                })
              }
            
            </div>
            <div className={s.row}>
              <button>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePage;
