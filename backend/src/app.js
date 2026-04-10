// src/app.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>✅ Forward Vision API - Funcionando</h1>");
});

console.log("📦 App Express cargada correctamente");

module.exports = app;