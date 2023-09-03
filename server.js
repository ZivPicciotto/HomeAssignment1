// Import required libraries and modules
const express = require("express");
const requests = require("./requests.js"); // Import custom module
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", async (req, res) => {
  try {
    res.send("Ziv's project - Please read the README file beforehand.");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

// Define routes for handling various data requests

//Handles requests for total amount of flights
app.get("/api/data/allFlights", async (req, res) => {
  try {
    res.send(
      `Amount of total flights:  ${await requests.numOfFlightsRequest()}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

//Handles requests for total amount of outbound flights
app.get("/api/data/allOutBound", async (req, res) => {
  try {
    res.send(
      `Amount of total outbound flights: ${await requests.numOfOutBoundFlights()}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

//Handles request for all inbound flights
app.get("/api/data/allInBound", async (req, res) => {
  try {
    res.send(
      `Amount of total inbound flights: ${await requests.numOfInBoundFlights()}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

//Handles request for all flights of a specific country
app.get("/api/data/allFlights/:country", async (req, res) => {
  try {
    // Getting the country from the request params and replacing underscores
    const country = req.params.country.replace("_", " ");

    res.send(
      `Amount of total flights from ${country}: ${await requests.numOfFlightsCountry(
        country.toUpperCase()
      )}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

//Handles request for all inbound flights of a specific country
app.get("/api/data/allInBound/:country", async (req, res) => {
  try {
    // Getting the country from the request params and replacing underscores
    const country = req.params.country.replace("_", " ");

    res.send(
      `Amount of total inbound flights from ${country}: ${await requests.numOfInBoundCountry(
        country.toUpperCase()
      )}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

//Handles request for all outbound flights of a specific country
app.get("/api/data/allOutBound/:country", async (req, res) => {
  try {
    // Getting the country from the request params and replacing underscores
    const country = req.params.country.replace("_", " ");

    res.send(
      `Amount of total outbound flights from ${country}: ${await requests.numOfOutBoundCountry(
        country.toUpperCase()
      )}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

//Handles request for all delayed flights
app.get("/api/data/allDelayed", async (req, res) => {
  try {
    res.send(
      `Amount of total delayed flights: ${await requests.numOfDelayedFlights()}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

//Handles request for most popular destination
app.get("/api/data/mostPopular", async (req, res) => {
  try {
    res.send(`${await requests.mostPopular()}`);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});

app.get("/api/data/quickGetaway", async (req, res) => {
  try {
    res.json(await requests.quickGetaway());
  } catch (error) {
    console.error("Error fetching data:", error);
    res.sendStatus(500).json({ error: "Error fetching data:" + error });
  }
});
