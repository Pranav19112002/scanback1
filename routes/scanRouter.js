const express = require("express");
const router = express.Router();
const Scan = require('../model/scanning');

// Route to get all scannings
router.get("/getallscannings", async (req, res) => {
  try {
    const scans = await Scan.find({});
    res.send(scans);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get scannings by ID
router.post("/getscanningsbyid", async (req, res) => {
    const scansid = req.body.scansid;
    try {
      const foundScan = await Scan.findOne({ _id: scansid });
      res.send(foundScan);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
});

// Route to add a new scanning
router.post("/addscanning", async (req, res) => {
  try {
    const newscan = new Scan(req.body);
    await newscan.save();
    res.send("New Scanning is Added Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update scan details
router.put("/updatescan/:id", async (req, res) => {
  const scanId = req.params.id;
  const updatedScanDetails = req.body;

  try {
    await Scan.updateOne({ _id: scanId }, { $set: updatedScanDetails });
    res.send("Scanning details updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a scan by ID
router.delete("/deletescan/:id", async (req, res) => {
  const scanId = req.params.id;
  try {
    const deleteScan = await Scan.findOneAndDelete({ _id: scanId });
    if (deleteScan) {
      res.send("Scanning details deleted successfully");
    } else {
      res.status(404).send("Scanning not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// Activation route
router.put('/handleactivate/:scanId', async (req, res) => {
  try {
    const scanId = req.params.scanId;

    // Find the scan by ID
    const scan = await Scan.findById(scanId);

    if (!scan) {
      return res.status(404).json({ message: 'Scanning not found' });
    }

    // Update the 'display' field to true (activate)
    scan.display = true;

    // Save the updated room
    await scan.save();

    return res.status(200).json({ message: 'scan activated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Deactivation route
router.put('/handledeactivate/:scanId', async (req, res) => {
  try {
    const scanId = req.params.scanId;

    // Find the scan by ID
    const scan = await Scan.findById(scanId);

    if (!scan) {


    // Update the 'display' field to false (deactivate)
    scan.display = false;
    }

    // Save the updated scanning
    await scan.save();

    return res.status(200).json({ message: 'Scan deactivated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/getscancount/:scanId', async (req, res) => {
  try {
    const scanId = req.params.scanId;

    // Fetch the scan by ID from the database
    const scan = await Scan.findById(scanId);

    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    // Send the count of the scannings
    res.json({ count: scan.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
