const express = require('express');
const router = express.Router();
const Transaction = require('./task01'); // Ensure this path is correct

router.get('/statistics', async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }
    try {
        const monthIndex = new Date(`${month} 01, 2000`).getMonth() + 1;

        const transactions = await Transaction.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthIndex]
            }
        });

        const totalSaleAmount = transactions.reduce((sum, transaction) => {
            return transaction.sold ? sum + transaction.price : sum;
        }, 0);

        const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
        const totalNotSoldItems = transactions.filter(transaction => !transaction.sold).length;

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics: ' + error.message });
    }
});
module.exports = router;
