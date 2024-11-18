import csvParser from "csv-parser";
import fs from "fs";
import clientPromise from '../../lib/mongodb';


export const config = {
  api: {
    bodyParser: false,  // Disable body parsing to handle file upload
  },
};

async function uploadCSV(req, res) {
  const formidable = require("formidable");

  const form = new formidable.IncomingForm();
  
  // Parse the incoming form-data (multipart form)
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "Error parsing the file." });
    }

    const file = files.file[0]; // The uploaded file

    // Read the CSV file
    const results = [];
    fs.createReadStream(file.filepath)
      .pipe(csvParser())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        try {
          // Connect to MongoDB
          const client = await clientPromise;
          const db = client.db('Plants');
          // Insert the parsed data into your MongoDB collection
          const collection = db.collection("plants");
          await collection.deleteMany({});
          await collection.insertMany(results);

          return res.status(200).json({ message: "Data uploaded successfully!" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Error inserting data into MongoDB." });
        }
      });
  });
}

export default uploadCSV;
