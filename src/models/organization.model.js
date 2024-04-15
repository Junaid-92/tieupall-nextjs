const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        slug: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        description: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
        email: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        photo: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        status: { type: DataTypes.ENUM('active','deleted','pending','inactive'), allowNull: false, defaultValue: 'pending' },
        is_public: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        created_by: { type: DataTypes.INTEGER, allowNull: false },
        //created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        //updated: { type: DataTypes.DATE },
    };

    const options = {
        tableName: 'organization',
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

    return sequelize.define('organization', attributes, options);
}