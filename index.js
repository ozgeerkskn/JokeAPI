import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const API_URL = "https://sv443.net/jokeapi/v2/";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    joke: null,
    setup: null,
    delivery: null,
    error: null,
  });
});

app.post("/", async (req, res) => {
  try {
    const filterString = req.body.word;
    const response = await axios.get(
      `${API_URL}joke/Any?contains=${filterString}`
    );
    if (response.data.error) {
      res.render("index.ejs", {
        joke: null,
        setup: null,
        delivery: null,
        error: response.data.message,
      });
    } else if (response.data.joke) {
      res.render("index.ejs", {
        joke: response.data.joke,
        setup: response.data.setup,
        delivery: response.data.delivery,
        error: null,
      });
    } else {
      res.render("index.ejs", {
        joke: null,
        setup: null,
        delivery: null,
        error: "No joke found for the given word.",
      });
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      joke: null,
      setup: null,
      delivery: null,
      error: "Bir hata oluştu.",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
