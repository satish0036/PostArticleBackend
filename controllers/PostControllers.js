import { db } from "../db.js";

// **********************************addHeading********************************
export const addHeading=(req,res)=>{

    const addContent = "INSERT INTO heading (autherId, title, date, description, image, imageBig, categories,author,avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const VALUES = [
        req.body.autherId,
        req.body.title,
        req.body.date,
        req.body.description,
        req.body.image,
        req.body.imageBig,
        req.body.categories,
        req.body.author,
        req.body.avatar,
        
      ];
      db.query(addContent, VALUES, (err, result) => {
        if (err) {
          console.error("Error creating Heading:", err);
          return res.status(500).json("Error creating Heading.");
        }
        
        return res.status(201).json(result.insertId);

      });
  }
// **********************************addContent********************************
export const addContent=(req,res)=>{

    const addContent = "INSERT INTO content (content, articleId) VALUES (?, ?)";
    const VALUES = [
        req.body.content,
        req.body.articleId,
      ];
      db.query(addContent, VALUES, (err, result) => {
        if (err) {
          console.error("Error creating content:", err);
          return res.status(500).json("Error creating content.");
        }
        return res.status(200).json("Content has been created.");


      });

    
  }

  // **********************************getHeading**************************************

export const getHeading = (req, res) => {
  
    const q = `SELECT * FROM heading order by articleId desc  `;
    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch heading.' });
      }  
      return res.json(data);
    });
  };
  // **********************************getContent**************************************

  export const getContent = (req, res) => {
    const articleId = req.params.articleId;
  
    const q = `SELECT * FROM content WHERE articleId = ?`;
  
    db.query(q, [articleId], (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch content.' });
      }
  
      if (data.length === 0) {
        return res.status(404).json({ error: 'Content not  found.' });
      }
  
      return res.json(data[0]);
    });
  };
// *******************************deletePost*****************************************
export const deletePost=(req,res)=>{
    const articleId=req.params.articleId
    const q="DELETE FROM heading where articleId= ?"
    db.query(q,[articleId],(err,data)=>{
        if (err) {
            return res.status(500).json({ error: 'Failed to delete.' });
          }
        return res.json("Post has been deleted succesfuly")
    })
  }


