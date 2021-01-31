import express from "express";

const router = express.Router();

router.post('/api/v1/yourquote',(req,res)=>{
    // console.log(req.body.number);
    res.send('helloe ')
})

export default router;
