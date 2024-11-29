const express = require("express");
const axios = require("axios");
const imageUrls = require("../imageURLs");
const router = express.Router();

router.get("/get-images", async (req, res) => {
  try {
    // Hacemos las solicitudes a las URLs de las imágenes
    const imagePromises = imageUrls.map((url) =>
      axios.get(url, { responseType: "arraybuffer" })
    );

    const images = await Promise.all(imagePromises);

    // Convertir los buffers binarios a base64
    const imageBase64 = images.map((response) =>
      `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`
    );

    res.json({ images: imageBase64 }); // Enviamos las imágenes como base64
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las imágenes");
  }
});

module.exports = router;
