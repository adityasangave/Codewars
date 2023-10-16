const Challenge = require('../models/Core/Challenge');

module.exports = function initializeSocketEvents(io) {
    io.on('connection', (socket) => {
        console.log('User Connected', socket.id)

        //Send room_name as invite_code and userId as current user Id with socket request as joinRoom
        socket.on('joinRoom', async (room_name, userId) => {
            
        });
    })
};
