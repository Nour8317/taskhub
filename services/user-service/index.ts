import express from "express";
import bodyParser from "body-parser";
import connectDB from "./src/infrastructure/database/mongo";
import { userRoutes } from "./src/api/routes/user-route";

const PORT = 8000;
const app = express();
app.use(express.json());
connectDB();
app.use(userRoutes);



app.get("/", (req, res) => {
    res.send("app running")
})

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
}) 