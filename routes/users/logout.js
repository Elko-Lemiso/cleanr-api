const express = require('express');
const router  = express.Router();

router.get("/logout", (req, res, next) => {
    console.log("hjhfoihfpihwf");
    req.session.destroy((err) => {
        res.json({message : "Logged out"});
    })
});

module.exports = router;