import express from "express"
import axios from "axios"

const app=express();
const port =3000;

// middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

// Route: Home Page

app.get("/", async (req,res)=>{
    try{
    // fetch a joke from joke api
    const category = req.query.category || "Any"; // Default to "Any" if not provided
    const amount = req.query.amount || 1; 
    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}?amount=${amount}&type=single`);
    const jokes= response.data.jokes || [response.data];
    //const joke= response.data.joke;
    res.render("index.ejs",{jokes, category, amount});
    }
    catch(error){
      console.error("Error fetching joke:", error.message);
      res.status(500).send("Could not fetch a joke at the moment.");
    }
});
app.listen(port, ()=>{
    console.log(`Joke app is running at http://localhost:${port}`);
});