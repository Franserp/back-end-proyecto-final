const Channel = require('./channels');
const Message = require('./messages');
const {User} = require('./users.js')

const defineAssociations = () => {
    Channel.hasMany(Message, { foreignKey: 'channel_id' });
    Message.belongsTo(Channel, { foreignKey: 'channel_id' });
    User.hasMany(Message, { foreignKey: 'user_id' });
    Message.belongsTo(User, { foreignKey: 'user_id' });
};

module.exports = defineAssociations;
