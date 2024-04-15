const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        chapter_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        org_id: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.ENUM('active','deleted','pending','inactive'), allowNull: false, defaultValue: 'pending' },
        //created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        //updated: { type: DataTypes.DATE },
    };

    const options = {
        tableName: 'user_organization',
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

    return sequelize.define('user_organization', attributes, options);
}