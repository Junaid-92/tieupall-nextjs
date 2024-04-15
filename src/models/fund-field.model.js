const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        org_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
        event_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
        name: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('active'), allowNull: false, defaultValue: 'active' },
    };

    const options = {
        tableName: 'fund_field',
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

    return sequelize.define('fund_field', attributes, options);
}