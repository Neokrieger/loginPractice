const express = require('express');
const router = express.Router({ mergeParams: true });
const { Comment } = require(`../models`);

router.post('/:id', async (req, res) =>{
  const comment = await Comment.create({
		text : req.body.comment,
    LoginId: req.params.id
	});
  res.redirect(`/user/${req.params.id}`)
})

module.exports = router;
