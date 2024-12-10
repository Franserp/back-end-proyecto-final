const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Workspace = require('./workspaces');



const Channel = sequelize.define('Channel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    workspace_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false, // Deshabilita los timestamps
});

module.exports = Channel;

// Configuración de la relación con Workspace
Workspace.hasMany(Channel, { foreignKey: 'workspace_id' });
Channel.belongsTo(Workspace, { foreignKey: 'workspace_id' });


module.exports = Channel;

