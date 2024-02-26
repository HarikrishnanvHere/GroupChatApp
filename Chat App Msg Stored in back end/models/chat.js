const Sequelize = require('sequelize');
const sequelize = require('../database');

const Chat = sequelize.define('chat',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING,
        allowNUll: false,
    }
})

module.exports = Chat;