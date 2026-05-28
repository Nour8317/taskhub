import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;

app.get("health", (req, res) => {
    res.send("app running")
})

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
})