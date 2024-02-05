const Challenge = require('../models/Core/Challenge');
const User = require('../models/User/User')

module.exports = function initializeSocketEvents(io) {
    io.on('connection', (socket) => {
        console.log('User Connected', socket.id)

        //Send room_name as invite_code and userId as current user Id with socket request as joinRoom
        socket.on('joinRoom', (room_name, userId) => {
            //Once user creates a challenge a room is created and once someone joins the challenge user is added to room

            // the room_name is invite code if room exits or not validation is performed at frontend
            //First user creates room then joinRoom event is triggered and user is added to ws room
            // Another user tries to join room using invite code and hits /join-challenge and then if user joins room successfully then only joinRoom ws is triggered

            socket.join(room_name)
            io.to(room_name).emit('newParticipants', userId) // Get name from userId
        });

        // to show how many participants are present in current room
        socket.on('getParticipants', async (room_name) => {
            console.log("getting participants")
            try {
                let challenge = await Challenge.findOne({ invite_code: room_name });
                if (!challenge) {
                    console.log("challenge not found")
                    socket.emit('roomNotFound', 'No room exists');
                }

                let users = challenge.participants; // array of uid
                let participants = await User.find({ _id: { $in: users } })
                let formattedParticipants = participants.map(({ _id, name, email }) => ({ id: _id, name, email }));

                console.log("formatted participants", formattedParticipants);
                io.to(room_name).emit('participants', formattedParticipants);
            } catch (error) {
                io.to(room_name).emit('failed', 'Something went wrong');
            }
        })

        // changes the state of user to ready or not ready
        socket.on('setParticipantState', async (room_name) => {
            try {
                let challenge = await Challenge.findOne({ invite_code: room_name });

                if (challenge) {
                    challenge.participants_state = (challenge.participants_state !== 1) ? challenge.participants_state + 1 : challenge.participants_state - 1;

                    await challenge.save();
                } else {
                    socket.emit('roomNotFound', 'No room exists');
                }
            } catch (error) {
                socket.emit('error', 'Something went wrong');
            }
        });

        //check if other participant is ready fired on start button
        socket.on('getParticipantState', async (room_name) => {
            try {
                let challenge = await Challenge.findOne({ invite_code: room_name });
                if (challenge)
                    if (challenge.participants_state === 1)
                        socket.emit('success', 1);
                    else socket.emit('failed', 0);
                else {
                    socket.emit('roomNotFound', 'No room exists');
                }
            } catch (error) {
                socket.emit('error', 'Something went wrong');
            }
        })

        socket.on('modifyProblem', (room_name, problem_name) => {
            console.log("problem is selected", problem_name)
            socket.to(room_name).emit('problemUpdated', problem_name)
        })

    })
};
