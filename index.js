import express from "express";
import axios from "axios";
import fs from "fs";

const port = 3000;
const app = express();
const API_KEY = JSON.parse(fs.readFileSync("api.json"))["api"];
//console.log(API_KEY);
const URL = "https://api.openuv.io/api/v1/uv?";
//const LAT = "45.3331984";
//const LON = "9.6940997";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const config = {
    headers:{
        "x-access-token":API_KEY,
        "Content-Type":"application/json"
    }
};


app.get("/", (req,res) =>  {
    res.render("index.ejs");
})


app.post("/", async (req,res) =>{
    const lat = req.body["lat"];
    const lon = req.body["lon"];
    console.log(lat);
    console.log(lon);
    try {
        const response = await axios.get(URL + "lat=" + lat + "&lng=" + lon, config);
        const result =  response.data["result"];
        const uv = result["uv"];
        console.log(JSON.stringify(result));
        res.render("index.ejs", {uv:uv});
    } catch (error) {
        res.render("index.ejs", {uv:error.message});
    }       
})


app.listen(port,()=>{
    console.log("Listening at port " + port);
})