const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();

// Set static folder
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
