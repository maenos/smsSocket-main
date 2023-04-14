var socket = require("socket.io");
const db = require('./database/db');
const message = require("./mogodb");
const { addMessage, getMessages, getMessagesForUser } = require('./plugin/mogoseSync');
let user = db.user;


module.exports = (server) => {
    const io = socket(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('onConnect', async (data) => {

            const userData = await user.update(
                { online: true },
                {
                    where: {
                        username: data.user
                    }
                });


            userData && io.emit('status', { username: data.user, online: true })

        });

        socket.on('ondisconnect', async (data) => {

            const userData = await user.update(
                { online: false },
                {
                    where: {
                        username: data.user
                    }
                });


            userData && io.emit('status', { username: data.user, online: false })

        });

        socket.on('message',  async (data) => {
            const msg = await addMessage(data.sender,data.receiver,data.content);

            msg && io.emit('newMsg', msg);

        })


        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat', async ({user}) => {
            
           const chats =  await  getMessagesForUser(user);

           chats && io.emit('allchat', chats);

        })

        
    });
};
