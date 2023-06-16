import Express from "express";
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgres://mputraraharja:oLQdnxU5gmS1@ep-lively-tooth-750094-pooler.ap-southeast-1.aws.neon.tech/lostandfound_db",
  ssl: {
    rejectUnauthorized: false,
    sslmode: "require",
  },
});

const app = Express();

app.get("/", (req, res) => {
  res.send("Lost and Found Finder Image API");
});

app.get("/image/:id", async (req, res) => {
  try {
    const imageId = req.params.id;
    const query = "SELECT image_data FROM item_image WHERE iditem_image = $1";
    const values = [imageId];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).send("Image not found");
    }

    const imageData = result.rows[0].image_data;
    const imageBuffer = Buffer.from(imageData, "binary");

    res.set("Content-Type", "image/jpeg"); // Adjust content type based on your image format
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default app;