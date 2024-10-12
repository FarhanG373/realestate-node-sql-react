import React, { useState, useEffect } from "react";
import s from "./Pages.module.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
const AddPropertyForSell = () => {
  const [propertyOwnerName, setPropertyOwnerName] = useState();
  const [propertyOwnerPhone, setPropertyOwnerPhone] = useState();
  const [propertyId, setPropertyId] = useState();
  const [propertyTitle, setPropertyTitle] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [propertyImage, setPropertyImage] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyFor, setPropertyFor] = useState("");
  const [err, setErr] = useState(null);

  const token = JSON.parse(localStorage.getItem("tokenRealEstate"));
  const decode = jwtDecode(token);
  const [getProperty, setProperty] = useState([]);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("propertyImage", propertyImage);
      const res = await axios.post(
        `http://localhost:9090/upload`,
        formData,
        config
      );
      return res.data.data;
    } catch (error) {
      if (error && error.response) {
        setErr(error.response.data.message);
      }
    }
  };
  const addproperty = async (e) => {
    e.preventDefault();
    const imgUrl = await uploadImage(e);
    setErr(null);
    try {
      const add = await axios.post(
        `http://localhost:9090/property/sellProperty`,
        {
          propertyImage: imgUrl,
          propertyOwnerName: propertyOwnerName,
          propertyOwnerPhone: propertyOwnerPhone,
          propertyId: propertyId,
          propertyTitle: propertyTitle,
          propertyDescription: propertyDescription,
          propertyPrice: propertyPrice,
          propertyAddress: propertyAddress,
          propertyType: propertyType,
          propertyFor: propertyFor,
        }
      );
      if (add.data.status === 200) {
        alert("Property added successfully!");
        window.location.href = "/dashboard";
        setPropertyTitle("");
        setPropertyDescription("");
        setPropertyPrice(0);
        setPropertyImage(null);
        setPropertyAddress("");
        setPropertyType("");
        propertyOwnerPhone("");
        setPropertyFor("");
      }
    } catch (error) {
      if (error && error.response) {
        setErr(error.response.data.message);
      }
    }
  };
  const getUserData = async () => {
    const res = await axios.get(`http://localhost:9090/auth/userDetail`);
    const data = res.data.data;
    const filter = data.filter((filt) => filt.id === decode.id);
    const map = filter.map((filt) => {
      setPropertyOwnerName(filt.fullName);
      setPropertyId(filt.id);
      setPropertyOwnerPhone(filt.phoneNumber);
    });
  };
  const onCancel = (e) => {
    e.preventDefault();
    window.location.href = "/dashboard";
    setPropertyTitle(null);
    setPropertyDescription(null);
    setPropertyPrice(0);
    setPropertyImage(null);
    setPropertyAddress(null);
    setPropertyType(null);
    setPropertyOwnerPhone(null);
    setPropertyFor(null);
    setErr(null);
  };
  const getProp = async () => {
    const getP = await axios.get(`http://localhost:9090/property/getProperty`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fetchProperty = getP.data.data.filter(
      (filter) => filter.propertyOwner === decode.id
    );
    setProperty(fetchProperty);
  };

  const deleteProp = async (id) => {
    try {
      const del = await axios.delete(
        `http://localhost:9090/property/deleteProperty/${id}`
      );
      if (del.data.status === 200) {
        alert("Property deleted successfully!");
        getProp();
      }
    } catch (error) {
      if (error) {
        setErr(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    getUserData();
    getProp();
  }, []);
  return (
    <div className={s.addProperty}>
      {err}
      <h1>Add Property For Sell</h1>
      <p>Add your property details and submit it for listing.</p>
      <form className={s.propertyAddForm}>
        <div className={s.row}>
          <label htmlFor="propertyId">Property Owner:</label>
          <input
            type="text"
            placeholder={propertyOwnerName}
            id="propertyId"
            name="propertyId"
            onChange={(e) => setPropertyOwnerName(e.target.value)}
            readOnly
            disabled
          />
        </div>
        <div className={s.row}>
          <label htmlFor="propertyOwnerPhone">Property Owner Phone:</label>
          <input
            type="text"
            placeholder={propertyOwnerPhone}
            id="propertyOwnerPhone"
            name="propertyOwnerPhone"
            onChange={(e) => setPropertyOwnerPhone(e.target.value)}
            readOnly
            disabled
          />
        </div>
        <div className={s.row}>
          <label htmlFor="propertyTitle">Property Title:</label>
          <input
            type="text"
            id="propertyTitle"
            name="propertyTitle"
            required
            onChange={(e) => setPropertyTitle(e.target.value)}
          />
        </div>
        <div className={s.row}>
          <label htmlFor="propertyDescription">Property Description:</label>
          <textarea
            id="propertyDescription"
            name="propertyDescription"
            rows="5"
            required
            onChange={(e) => setPropertyDescription(e.target.value)}
          />
        </div>
        <div className={s.row}>
          <label htmlFor="propertyPrice">Property Price:</label>
          <input
            type="text"
            min={0}
            id="propertyPrice"
            name="propertyPrice"
            required
            onChange={(e) => setPropertyPrice(e.target.value)}
          />
        </div>
        <div className={s.row}>
          <label htmlFor="propertyAddress">Property Address:</label>
          <textarea
            id="propertyAddress"
            name="propertyAddress"
            rows="5"
            required
            onChange={(e) => setPropertyAddress(e.target.value)}
          />
        </div>
        <div className={s.row}>
          <label htmlFor="propertyType">Property Type:</label>
          <select
            id="properiType"
            name="propertyType"
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Select Property Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className={s.row}>
          <label htmlFor="properiFor">Property For:</label>
          <select
            id="properiFor"
            name="propertyFor"
            onChange={(e) => setPropertyFor(e.target.value)}
          >
            <option value="">Select Property For</option>
            <option value="sell">For Sell</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <div className={s.row}>
          <label htmlFor="propertyImage">Property Image:</label>
          <input
            type="file"
            id="propertyImage"
            name="propertyImage"
            required
            onChange={(e) => setPropertyImage(e.target.files[0])}
          />
        </div>
        <div className={s.row}>
          <button onClick={addproperty}>Submit</button>
          <button onClick={onCancel} type="reset">
            Cancel
          </button>
        </div>
      </form>
      {getProperty.length > 0 && (
        <>
          <h2>Posted Property list for sell</h2>
          <table className={s.propertyTable}>
            <thead>
              <tr>
                <th>Property Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Type</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getProperty.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={`/uploads/${p.propImage}`} alt={p.propertyName} />
                  </td>
                  <td>{p.propertyName}</td>
                  <td>{p.propertyPrice}</td>
                  <td>{p.propertyType}</td>
                  <td>{p.propertyAddress}</td>
                  <td>
                    <button onClick={() => deleteProp(p.id)}>Delete</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`/single/${p.id}`}>View detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AddPropertyForSell;
