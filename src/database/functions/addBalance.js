// const { Sequelize } = require('sequelize');
// const sequelize = require('../dbsync.js');
// const UsersMessages = require('../model/messagesUsers.js')(sequelize, Sequelize.DataTypes);

// async function addBalance(id, bal) {
    
//         const usersMessages = await UsersMessages.findOne({ where: { user_id: id }});
//         if (!usersMessages) {
//             const newUserMessages = await UsersMessages.create({ user_id: id, user_message: 1, user_message_timely: 1 });
//         } else {
//             usersMessages.user_message += 1;
//             usersMessages.user_message_timely += 1;
//             usersMessages.save();
//         }
//     }


// module.exports = addBalance;