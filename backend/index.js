const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());

// === GROUPED PRODUCTS WITH FILTERING & PAGINATION ===
app.get("/api/products/grouped", (req, res) => {
  const { mainCategory, subCategory, page = 1, limit = 20 } = req.query;
  const fallbackPath = path.join(__dirname, "SanMar_SDL_Fallback.csv");
  const grouped = {};
  const globalSeen = new Set();

  fs.createReadStream(fallbackPath)
    .pipe(csv())
    .on("data", (row) => {
      const categoryParts = (row["CATEGORY_NAME"] || "").split(";").map((s) => s.trim());
      const main = categoryParts[0];
      const sub = categoryParts[1] || "";

      const matchesMain = !mainCategory || main === mainCategory;
      const matchesSub = !subCategory || sub === subCategory;

      if (!matchesMain || !matchesSub) return;

      const style = (row["STYLE#"] || "").trim().toUpperCase();
      const productName = (row["PRODUCT_TITLE"] || "").trim();
      const description = (row["PRODUCT_DESCRIPTION"] || "").trim();
      const colorName = (row["COLOR_NAME"] || "").trim();
      const msrpRaw = row["AF"]?.trim();
      const msrp = msrpRaw && !isNaN(msrpRaw) && Number(msrpRaw) > 0 ? Number(msrpRaw) : null;
      const thumbnail = (row["THUMBNAIL_IMAGE"] || "").trim();
      const fullImage = (row["COLOR_PRODUCT_IMAGE"] || row["PRODUCT_IMAGE"] || "").trim();

      if (!style || !productName || !colorName || !thumbnail) return;

      const key = `${style}_${colorName}_${thumbnail}`;
      if (globalSeen.has(key)) return;
      globalSeen.add(key);

      if (!grouped[style]) {
        grouped[style] = {
          style,
          name: productName,
          description,
          colors: [],
        };
      }

      grouped[style].colors.push({
        name: colorName,
        thumbnail,
        fullImage,
        msrp,
      });
    })
    .on("end", () => {
      const pageInt = parseInt(page);
      const limitInt = parseInt(limit);
      const groupedArray = Object.values(grouped);
      const paginated = groupedArray.slice((pageInt - 1) * limitInt, pageInt * limitInt);

      res.json({
        page: pageInt,
        limit: limitInt,
        total: groupedArray.length,
        totalPages: Math.ceil(groupedArray.length / limitInt),
        data: paginated,
      });
    })
    .on("error", (err) => {
      console.error("❌ Failed to group products:", err);
      res.status(500).json({ error: "Failed to group products" });
    });
});

// === GET ALL COLOR VARIANTS BY STYLE ===
app.get("/api/products/by-style/:style", (req, res) => {
  const { style } = req.params;
  const fallbackPath = path.join(__dirname, "SanMar_SDL_Fallback.csv");
  const result = [];

  fs.createReadStream(fallbackPath)
    .pipe(csv())
    .on("data", (row) => {
      const rowStyle = (row["STYLE#"] || "").trim().toUpperCase();
      if (rowStyle !== style.trim().toUpperCase()) return;

      const msrpRaw = row["AF"]?.trim();
      const msrp = msrpRaw && !isNaN(msrpRaw) && Number(msrpRaw) > 0 ? Number(msrpRaw) : null;

      result.push({
        name: row["PRODUCT_TITLE"]?.trim(),
        style: rowStyle,
        description: row["PRODUCT_DESCRIPTION"]?.trim(),
        msrp,
        color: row["COLOR_NAME"]?.trim(),
        thumbnail: row["THUMBNAIL_IMAGE"]?.trim(),
        fullImage: row["COLOR_PRODUCT_IMAGE"]?.trim() || row["PRODUCT_IMAGE"]?.trim(),
      });
    })
    .on("end", () => {
      if (result.length === 0) {
        return res.status(404).json({ error: `Style ${style} not found.` });
      }

      const grouped = {
        name: result[0].name,
        style: result[0].style,
        description: result[0].description,
        colors: [],
      };

      const colorSet = new Set();
      result.forEach((item) => {
        if (!colorSet.has(item.color)) {
          grouped.colors.push({
            name: item.color,
            thumbnail: item.thumbnail,
            fullImage: item.fullImage,
            msrp: item.msrp,
          });
          colorSet.add(item.color);
        }
      });

      res.json(grouped);
    })
    .on("error", (err) => {
      console.error("❌ Error in by-style route:", err);
      res.status(500).json({ error: "Failed to fetch product by style" });
    });
});

app.listen(PORT, () =>
  console.log(`🚀 Backend API listening at http://localhost:${PORT}`)
);
