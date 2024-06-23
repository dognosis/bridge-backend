import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });

  return;
});

app.listen(PORT, () => {
  return console.log(`Express is listening at https://localhost:${PORT}`);
});
