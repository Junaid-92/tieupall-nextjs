const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        org_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
        event_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        status: { type: DataTypes.ENUM('active'), allowNull: false, defaultValue: 'active' },
    };

    const options = {
        tableName: 'fund_package',
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

    return sequelize.define('fund_package', attributes, options);
}