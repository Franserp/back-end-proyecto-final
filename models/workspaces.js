// models/Workspace.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Workspace = sequelize.define('Workspace', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'workspaces',
  timestamps: false
});

module.exports = Workspace;
