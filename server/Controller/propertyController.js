import { con } from "../DB/DB.js";

export const sellProperty = (req, res) => {
  const {
    propertyId,
    propertyTitle,
    propertyDescription,
    propertyPrice,
    propertyAddress,
    propertyType,
    propertyOwnerPhone,
    propertyImage,
    propertyFor,
  } = req.body;
  if (
    !propertyId ||
    !propertyTitle ||
    !propertyDescription ||
    !propertyPrice ||
    !propertyAddress ||
    !propertyType ||
    !propertyImage ||
    !propertyFor
  ) {
    return res
      .status(400)
      .json({ status: 400, message: `Missing required fields` });
  }
  const insert = `INSERT INTO property SET?`;
  con.query(
    insert,
    {
      propertyOwner: propertyId,
      propertyName: propertyTitle,
      propertyDescription: propertyDescription,
      propertyPrice: propertyPrice,
      propertyAddress: propertyAddress,
      propertyType: propertyType,
      ownerPhone: propertyOwnerPhone,
      propImage: propertyImage,
      propertyFor: propertyFor,
    },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: "Internal server error" });
        return;
      }
      return res.json({
        status: 200,
        message: "Property added successfully",
        data: result,
      });
    }
  );
};

export const getProperty = (req, res) => {
  const select = `SELECT * FROM property`;
  con.query(select, (err, result) => {
    if (err) throw err;
    return res
      .status(200)
      .json({ status: 200, message: "Data fetch success", data: result });
  });
};

export const singleProperty = (req, res) => {
  const id = req.params.id;
  const select = `SELECT * FROM property WHERE id =?`;
  con.query(select, [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Property not found" });
    }
    return res
      .status(200)
      .json({ status: 200, message: "Data fetch success", data: result });
  });
};

export const deleteProperty = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM property WHERE id =?`;
  con.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Property not found" });
    }
    return res.json({ status: 200, message: "Property deleted successfully" });
  });
};
