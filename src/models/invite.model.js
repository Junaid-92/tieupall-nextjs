const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        sender_id: { type: DataTypes.INTEGER, allowNull: false },
        invited_user_id: { type: DataTypes.INTEGER, allowNull: false },
        org_id: { type: DataTypes.INTEGER, allowNull: false },
        chapter_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        email: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('invited','accepted','declined','withdrawn'), allowNull: false, defaultValue: 'invited' },
    };

    const options = {
        tableName: 'invite',
        // disable default timestamp fields (createdAt and updatedAt)
        //timestamps: false, 
        defaultScope: {
            // exclude password hash by default
            //attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }        
    };

    return sequelize.define('invite', attributes, options);
}