const express = require("express")
const Challenge = require('../../models/Core/Challenge')
const verify = require('../../middlewares/verifyAuthToken')
const server = require('../../index')

const router = express.Router()

// Endpoint to create challenge
//this endpoint require trigerring joinRoom websocket and updating participants and redirect to choose problem statement page
router.post('/create-challenge', verify, async (req, res) => {
  try {
    const challenge_name = req.body.challenge_name;

    const challenge = new Challenge({
      challenge_name: challenge_name,
      created_by: req.user._id,
      participants : [req.user._id]
    });

    await challenge.save();

    res.status(200).json({ message: "Challenge Joining Code" + challenge.invite_code });
  } catch (error) {
    console.log("Error creating challenge", error);
    res.status(500).json({ message: "Error creating challenge" });
  }
});

//this endpoint require trigerring joinRoom websocket and updating participants and redirect to ps page
router.post('/join-challenge', verify, async (req, res) => {
  try {
    const invite_code = req.body.invite_code;
    let challenge = await Challenge.findOne({ invite_code: invite_code })
    if (!challenge)
      res.status(403).json({ Error: "Challenge Does not found" });

    if (challenge.participants.length === 2)
      res.status(403).json({ Error: "Challange is already full" });

    await challenge.participants.push(req.user._id);
    await challenge.save();

    res.status(200).json({ Success: "New User Joined the challenge" + req.user._id});
  } catch (error) {
    res.status(500).json({ message: "Error Joining Challenge" });
  }
});


module.exports = router;

