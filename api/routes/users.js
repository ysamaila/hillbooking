import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("first auth  endpoint!");
})

export default router;