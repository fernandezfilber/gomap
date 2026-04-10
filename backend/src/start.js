const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/health", (_, res) => res.status(200).send("ok"));

app.listen(PORT, "0.0.0.0", () => {
 console.log(`Server listening on ${PORT}`);
});