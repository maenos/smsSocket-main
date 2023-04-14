const Message = require('../mogodb')

async function addMessage(sender, receiver, content) {
    try {
      const message = await Message.create({
        sender,
        receiver,
        content
      });
    return message;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du message à la base de données:', error.message);
    }
  }

async function getMessages() {
  try {
    const messages = await Message.find();
 
  } catch (error) {
    console.error('Erreur lors du chargement des messages depuis la base de données:', error.message);
  }
}


// Récupérer les messages pour un utilisateur spécifique
async function getMessagesForUser(username) {
  try {
    const messages = await Message.find({ 
      $or: [ 
        { sender: username }, 
        { receiver: username } 
      ] 
    });
    return messages;
  } catch (error) {
    console.error(error);
  }
}




module.exports =  {addMessage,getMessages,getMessagesForUser};