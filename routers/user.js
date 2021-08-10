const express = require('express')
const router = express.Router( { mergeParams: true } )

router.get('/', (req, res) => {
    res.render('user');
});

// router.post('/', async (req, res) =>{

// })

module.exports = router;