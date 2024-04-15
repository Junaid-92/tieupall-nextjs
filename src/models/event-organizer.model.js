const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        event_id: { type: DataTypes.INTEGER, allowNull: false },
        fundraising_permission: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        ticket_permission: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        is_event_admin: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        status: { type: DataTypes.ENUM('active'), allowNull: false, defaultValue: 'active' },
    };

    const options = {
        tableName: 'event_organizer',
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

    return sequelize.define('event_organizer', attributes, options);
}