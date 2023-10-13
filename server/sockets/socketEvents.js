const Challenge = require('../models/Core/Challenge');

module.exports = function initializeSocketEvents(io) {
    io.on('connection', (socket) => {
        console.log('User Connected', socket.id)

        //Send room_name as invite_code and userId as current user Id with socket request as joinRoom
        socket.on('joinRoom', async (room_name, userId) => {
            try {

                let challenge = await Challenge.findOne({ invite_code: room_name })
                if (!challenge) {
                    console.log('The challenge does not exist');
                    return;
                }
                
                await challenge.participants.push(userId);
                await challenge.save();

                console.log(`User ${userId} joined the challenge`);
            }

            catch (error) {
                console.error('Error updating the challenge instance:', error);
            }
        });
    })
};
