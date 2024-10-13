import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getsingleProperty } from '../Redux/PropertySlice';
import s from "./Pages.module.scss";

const SinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, data = [] } = useSelector((state) => state.property);
  const [dataProperty, setData] = useState(data);
  const [con, setContact] = useState(false);
  const token = JSON.parse(localStorage.getItem('tokenRealEstate'));
  const contact = () => {
    setContact(!con);
  };

  useEffect(() => {
    dispatch(getsingleProperty(id)).then((response) => {
      setData(response.payload);
    });
  }, [dispatch, id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className={s.wrap}>
      <div className={s.single}>
        <div className={s.det}>
          {dataProperty.map((p) => (
            <div key={p.id}>
              <img
                src={`/uploads/${p.propImage}`}
                alt={p.propertyName}
                width={"100%"}
              />
              <h2>{p.propertyName}</h2>
              <p>{p.propertyDescription}</p>
              <p>
                <b>Price:</b> {p.propertyPrice}
              </p>
              <p>
                <b>Location:</b> {p.propertyAddress}
              </p>
              <p>
                <b>Type:</b> {p.propertyType}
              </p>
              <p>
                <b>Property For:</b> {p.propertyFor}
              </p>
            </div>
          ))}

          {token ? (
            <button onClick={contact}>Contact with seller</button>
          ) : (
            <Link to={`/login`}>Login for contact seller</Link>
          )}
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
              {dataProperty && (
                <input
                  type="text"
                  value={dataProperty[0].propertyName}
                  disabled
                />
              )}
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