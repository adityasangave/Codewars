const express = require("express")
const Challenge = require('../../models/Core/Challenge')
const verify = require('../../middlewares/verifyAuthToken')
const server = require('../../index')

const router = express.Router()

// Endpoint to create challenge
router.post('/create-challenge', verify, async (req, res) => {
  try {
    const challenge_name = req.body.challenge_name;
    console.log(req.user._id)
    const challenge = new Challenge({
      challenge_name: challenge_name,
      created_by: req.user._id
    });

    await challenge.save();

    res.status(200).json({ message: "Challenge Joining Code" + challenge.invite_code });
  } catch (error) {
    console.log("Error creating challenge", error);
    res.status(500).json({ message: "Error creating challenge" });
  }
});


module.exports = router;

