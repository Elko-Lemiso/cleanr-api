const express = require('express');
const router  = express.Router();

router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        console.log('logged out!')
        res.json({message: "logged out"});
    });
});

module.exports = router;