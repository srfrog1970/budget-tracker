const router = require("express").Router();
const Transaction = require("../models/transaction.js");

// Removed invalid catch-all route that referenced an undefined path variable

router.post("/api/transaction", async ({ body }, res) => {
  try {
    const dbTransaction = await Transaction.create(body);
    res.status(201).json(dbTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/api/transaction/bulk", async ({ body }, res) => {
  try {
    const dbTransaction = await Transaction.insertMany(body);
    res.status(201).json(dbTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/api/transaction", async (req, res) => {
  try {
    const dbTransaction = await Transaction.find({}).sort({ date: -1 });
    res.json(dbTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
