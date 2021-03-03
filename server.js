const PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//Added for Heroku deployment:
app.use("/build", express.static(path.join(__dirname, "/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
console.log(process.env.SECRET);
app.listen(PORT, () => console.log("Server Running On Port " + PORT));
