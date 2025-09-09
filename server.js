import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const BASE_URL = "https://api.justtcg.com/v1";
const APIKEY = process.env.API_KEY;

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/getPrice", async (req, res) => {
    const { cardName, gameName="Pokemon", condition = "Near Mint" } = req.query;

    if (!cardName) return res.status(400).json({error: "cardName is required"});

    try{
        const url = new URL(`${BASE_URL}/cards`);
        url.search = new URLSearchParams({game: gameName, q: cardName});

        const response = await fetch(url, {headers: {"x-api-key": APIKEY}});
        const data = await response.json();

        const cards = data?.data || [];
        if (cards.length === 0) return res.json({price: null});

        const card = cards[0];
        const variant = card.variants?.find(v => v.condition === condition);

        res.json({price: variant?.price || null});

    } catch (err){
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));