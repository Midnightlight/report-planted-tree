const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

let treeReports = [];

app.post("/report-tree", (req, res) => {
  const { numberOfTrees, plantingLocation, treeSpecies, additionalNotes, monitorGrowth } = req.body;

  if (!numberOfTrees || !plantingLocation || !treeSpecies) {
    return res.status(400).json({ error: "Missing required fields: numberOfTrees, plantingLocation, and treeSpecies are required." });
  }

  if (isNaN(numberOfTrees) || numberOfTrees <= 0) {
    return res.status(400).json({ error: "numberOfTrees must be a positive number." });
  }

  // Create a new tree report object
  const newReport = {
    id: treeReports.length + 1,
    numberOfTrees,
    plantingLocation,
    treeSpecies,
    additionalNotes,
    monitorGrowth,
    date: new Date(),
  };

  treeReports.push(newReport);

  res.status(201).json({ message: "Tree report submitted successfully", report: newReport });
});

app.get("/tree-reports", (req, res) => {
  if (treeReports.length === 0) {
    return res.status(404).json({ message: "No tree reports found." });
  }
  res.status(200).json(treeReports);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
