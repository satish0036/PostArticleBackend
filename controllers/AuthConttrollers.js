
import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// ************************************signup*****************************
export const signup = (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const passcode = req.body.passCode;

  const checkpasscode = "select * from passcode where passCode=? ";

  db.query(checkpasscode, [passcode], (err, data) => {
    if (err) {
      console.error("Error checking Passcode:", err);
      return res.status(500).json("Error checking PassCode.");
    }
    if (data.length === 0) {
      console.log(data)
      return res.status(404).json("PassCode not found!");
    }


    // Check if the user exists with the provided mobileNumber
    const checkUserQuery = "SELECT * FROM auther WHERE mobileNumber = ?";
    db.query(checkUserQuery, [mobileNumber], (err, data) => {
      if (err) {
        console.error("Error checking users:", err);
        return res.status(500).json("Error checking usera.");
      }

      // Check if any data rows are returned (user with the provided mobileNumber exists)
      if (data.length > 0) {
        return res.status(409).json("User exists with this mobileNumber!");
      }

      //hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      // If user does not exist, insert the new user
      const insertUserQuery = "INSERT INTO auther (autherName, mobileNumber, passCode,autherPicture, password) VALUES (?, ?, ?, ?, ?)";
      const VALUES = [
        req.body.autherName,
        req.body.mobileNumber,
        req.body.passCode,
        req.body.autherpicture,
        hash
      ];

      db.query(insertUserQuery, VALUES, (err, result) => {
        if (err) {
          console.error("Error creating user:", err);
          return res.status(500).json("Error creating user.");
        }
        return res.status(200).json("User has been created.");


      });
    });
  })
};





// ********************************Login************************************
export const login = (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const inputpassword = req.body.password;

  // Check if the user exists in the database
  const query = "SELECT * FROM auther WHERE mobileNumber = ?";
  db.query(query, [mobileNumber], (err, data) => {

    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json("Error checking user.");
    }

    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }
    //check password
    const isPasswordCorrect = bcrypt.compareSync(inputpassword, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong Username or Password!");


    // Password is correct, create a JWT token
    const token = jwt.sign({ autherId: data[0].autherId }, "jwtkey");

    // Exclude password from the response and send other user data
    const { password, ...userWithoutPassword } = data[0];

    // Set the JWT token as an HttpOnly cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,

      // Add other secure cookie options like "secure: true" for HTTPS-only
    }).status(200).json(userWithoutPassword);
  });
};




// *********************************Logout***************************************
export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User loged out");
}




